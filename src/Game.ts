class Game {

    private player: Player;
    private view: View;
    private activeRoom: Room;
    private activeQuestion: Question
    private rooms: Room[] = []
    private vault: Vault = new Vault(Game.loadNewImage('assets/img/backgrounds/vault.png'))
    private readonly keypad: Keypad;
    private readonly canvas: HTMLCanvasElement;
    private doorLocationsLobby1: collisionObj[];
    private doorLocationsLobby2: collisionObj[];
    private lobbies: collisionObj[]
    private listsLoaded: number = 0

    public constructor(canvas: HTMLElement, playerName: string, characterName: string, windowHeight: number, windowWidth: number) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;

        this.player = new Player(playerName, characterName, Game.loadNewImage(`assets/img/players/char${characterName}back.png`), this.canvas.width, this.canvas.height, 'hallway1.png')
        this.view = new View(Game.loadNewImage('assets/img/backgrounds/hallway1.png'))

        this.keypad = new Keypad(Game.loadNewImage('assets/img/backgrounds/keypadzoomin.png'), this.canvas.width, this.canvas.height)

        this.createRooms()
        requestAnimationFrame(this.step);
    }


    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {
        this.update()
        this.render()
        requestAnimationFrame(this.step);
    }


    public update() {
        if (this.listsLoaded != 20) {
            this.fillLists()
            this.listsLoaded++
        }
        this.player.update(this.canvas.width, this.canvas.height)

        if (this.getImgName(this.view.img).includes('1')) {
            this.doorAndLobbyDetection(this.doorLocationsLobby1)
        } else if (this.getImgName(this.view.img).includes('2')) {
            this.doorAndLobbyDetection(this.doorLocationsLobby2)
        }

        if (this.view === this.vault) {
            if (this.player.keyListener.isKeyDown(32)) {
                Game.popup('Goed gedaan', 'Je hebt de kluis geopend en gewonnen')
            }
        }

        if (this.view === this.keypad) {
            if (this.player.keyListener.keyDownOnce(8)) {
                this.keypad.deleteLastNum()
            }
            if (this.player.keyListener.isKeyDown(32)) {
                this.keypad.checkCode(this.player.collectedCodes, this.vault)
            }
        }


        this.doorAndLobbyDetection(this.lobbies)
        this.returnToLobby()
    }

    public checkAnswer(button: string, answer: string) {
        if (this.activeQuestion.goodAnswer === answer) {
            Game.popup('Goed gedaan', 'Je hebt de vraag goed beantwoord')
            this.activeRoom.hideQuestion()
            this.activeRoom.questions.splice(this.activeRoom.questions.indexOf(this.activeQuestion), 1)
            this.activeRoom.clickableItems.splice(this.activeRoom.clickableItems.indexOf(this.activeRoom.lastClickedObj), 1)
            this.activeQuestion = undefined;
            if (this.activeRoom.questions.length === 0) {
                this.player.collectedCodes.forEach(code => {
                    if (code.roomNum === this.activeRoom.roomNumber) {
                        code.codeNum = Room.getRndInteger(1, 10)
                    }
                })
                Game.popup('Goed gedaan, kamer voltooid', 'alle vragen in deze kamer zijn goed beantwoord, nieuw deel van de code vrijgespeeld, druk op ESC om de kamer te verlaten')
            }
        } else {
            Game.popup('Helaas, fout', 'Probeer opnieuw')
            this.activeQuestion.showHint = true;
            this.activeRoom.hideQuestion()
            this.activeQuestion = undefined;
        }
    }


    public getCursorPosition(x: number, y: number, type: string) {
        if (this.activeRoom != null && this.activeQuestion === undefined) {
            let question = this.activeRoom.checkClick(x, y, type)
            if (question != null) {
                this.activeQuestion = question
            }
        }
        if (this.view === this.keypad) {
            this.keypad.checkClick(x, y, type)
        }
    }


    public render() {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx, this.canvas.width, this.canvas.height)
        this.player.draw(ctx)

        if (this.activeRoom != undefined) {
            this.activeRoom.clickableItems.forEach(obj => {
                ctx.beginPath();
                ctx.rect(obj.minX, obj.minY, 5, 5);
                ctx.rect(obj.maxX, obj.maxY, 5, 5);
                ctx.stroke();
            })
        }

        if (this.view === this.vault) {
            Game.writeTextToCanvas(ctx, 'Druk op "spatie" om het spel te beindigen', this.canvas.width / 2, this.canvas.height - 40, 40)
        }

        if (this.view === this.keypad) {
            this.keypad.drawCode(ctx, this.canvas.width, this.canvas.height)
            Game.writeTextToCanvas(ctx, 'Druk op "spatie" om de code te controleren', this.canvas.width / 2, this.canvas.height - 40, 40)
        }

    }

    public doorAndLobbyDetection(list: collisionObj[]) {
        let playerX: number = this.player.x + (this.player.baseImg.width / 2)
        let playerY: number = this.player.y + (this.player.baseImg.height / 2)
        list.forEach((obj: collisionObj) => {
                if (playerX > obj.minX && playerX < obj.maxX && playerY > obj.minY && playerY < obj.maxY) {
                    switch (obj.name) {
                        case 'lobby':
                            switch (obj.img) {
                                case '1':
                                    if (this.getImgName(this.view.img).includes('2')) {
                                        this.player.x = this.player.baseImg.width - (this.player.baseImg.width / 2)
                                        this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`))
                                        this.player.lobby = this.getImgName(this.view.img)
                                    }
                                    break
                                case '2':
                                    if (this.getImgName(this.view.img).includes('1')) {
                                        this.player.x = this.canvas.width - (this.player.baseImg.width * 1.1)
                                        this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`))
                                        this.player.lobby = this.getImgName(this.view.img)
                                    }
                                    break
                            }
                            break;
                        case 'door':
                            if (this.player.keyListener.isKeyDown(13)) {
                                this.rooms.forEach(room => {
                                    if (this.getImgName(room.img) === `${obj.img}.png`) {
                                        this.view = room
                                        this.activeRoom = room
                                        this.player.inRoom = true;
                                    }
                                })
                            }
                            break;
                        case 'vault':
                            if (this.player.keyListener.isKeyDown(13)) {
                                if (this.vault.isOpen) {
                                    this.view = this.vault
                                    this.player.inRoom = true;
                                } else {
                                    Game.popup('Kluis zit nog op slot', 'vul de juiste code in op de keypad om de kluis te openen')
                                }

                            }
                            break;
                        case 'keypad':
                            if (this.player.keyListener.isKeyDown(13)) {
                                this.view = this.keypad
                                this.player.inRoom = true;
                            }
                            break;

                    }
                }
            }
        )
    }


    public returnToLobby() {
        if (this.player.keyListener.isKeyDown(27) && this.activeQuestion === undefined) {
            this.view = new View(Game.loadNewImage(`assets/img/backgrounds/${this.player.lobby}`))
            this.activeRoom = null;
            this.player.inRoom = false;
        }
    }

    /**
     * Writes text to the canvas
     * @param ctx
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public static writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        xCoordinate: number,
        yCoordinate: number,
        fontSize: number = 30,
        color: string = "black",
        alignment: CanvasTextAlign = "center"
    ) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(text, xCoordinate, yCoordinate);
    }


    /**
     * Loads an image in such a way that the screen doesn't constantly flicker
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    public static loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    public static popup(headerText: string, bodyText: string) {
        document.getElementById('popupButton').click()
        document.getElementById('headerText').innerHTML = headerText
        document.getElementById('bodyText').innerHTML = bodyText
    }

    public getImgName(img: HTMLImageElement): string {
        let fullPath = img.src;
        return fullPath.replace(/^.*[\\\/]/, '')
    }


    private createRooms() {
        let basic1: Room = new RoomBasic303(Game.loadNewImage('assets/img/rooms/room3.png'), this.canvas.width, this.canvas.height, 303)
        let basic2: Room = new RoomSky403(Game.loadNewImage('assets/img/rooms/room7.png'), this.canvas.width, this.canvas.height, 403)
        let bath: Room = new RoomBath401(Game.loadNewImage('assets/img/rooms/room4.png'), this.canvas.width, this.canvas.height, 401)
        let beach: Room = new RoomBeach402(Game.loadNewImage('assets/img/rooms/room6.png'), this.canvas.width, this.canvas.height, 402)
        let chinese: Room = new RoomChinese400(Game.loadNewImage('assets/img/rooms/room5.png'), this.canvas.width, this.canvas.height, 400)
        let future: Room = new RoomFuture301(Game.loadNewImage('assets/img/rooms/room1.png'), this.canvas.width, this.canvas.height, 301)
        let penthouse: Room = new RoomPenthouse302(Game.loadNewImage('assets/img/rooms/room2.png'), this.canvas.width, this.canvas.height, 302)
        this.rooms.push(basic1, basic2, bath, beach, chinese, future, penthouse)
        this.player.collectedCodes.push(new Code(basic1.roomNumber), new Code(basic2.roomNumber), new Code(bath.roomNumber), new Code(beach.roomNumber), new Code(chinese.roomNumber), new Code(future.roomNumber), new Code(penthouse.roomNumber))
    }

    private fillLists() {
        this.lobbies = [
            {
                name: 'lobby',
                minX: 0,
                minY: 0,
                maxX: this.player.baseImg.width / 2,
                maxY: this.canvas.height,
                img: '2'
            },
            {
                name: 'lobby',
                minX: this.canvas.width - (this.player.baseImg.width / 2),
                minY: 0,
                maxX: this.canvas.width,
                maxY: this.canvas.height,
                img: '1'
            }
        ]
        this.doorLocationsLobby1 = [
            {
                name: 'door',
                minX: this.canvas.width / 35,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 6,
                maxY: this.canvas.height / 1.1,
                img: 'room1'
            },
            {
                name: 'door',
                minX: this.canvas.width / 3.4,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 2.25,
                maxY: this.canvas.height / 1.1,
                img: 'room2'
            },
            {
                name: 'door',
                minX: this.canvas.width / 1.85,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.45,
                maxY: this.canvas.height / 1.1,
                img: 'room3'
            },
            {
                name: 'door',
                minX: this.canvas.width / 6,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 3.2,
                maxY: this.canvas.height / 2,
                img: 'room4'
            },
            {
                name: 'door',
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.76,
                maxY: this.canvas.height / 2,
                img: 'room5'
            },
        ]
        this.doorLocationsLobby2 = [
            {
                name: 'door',
                minX: this.canvas.width / 1.45,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.2,
                maxY: this.canvas.height / 2,
                img: 'room6'
            },
            {
                name: 'door',
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.76,
                maxY: this.canvas.height / 2,
                img: 'room7'
            },
            {
                name: 'vault',
                minX: this.canvas.width / 1.7,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.3,
                maxY: this.canvas.height / 1.1,
                img: 'room6'
            },
            {
                name: 'keypad',
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 2,
                maxY: this.canvas.height / 1.1,
                img: 'room6'
            },

        ]
    }

}

type collisionObj = {
    name: string,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    img?: string
}
