class Game {

    private player: Player;
    private view: View;
    private readonly canvas: HTMLCanvasElement;
    private doorLocationsLobbyA: collisionObj[];
    private doorLocationsLobbyB: collisionObj[];
    private lobbies: collisionObj[]

    public constructor(canvas: HTMLElement, playerName: string, characterName: string, windowHeight: number, windowWidth: number) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
        this.player = new Player(playerName, characterName, Game.loadNewImage(`assets/img/players/char${characterName}Back.png`), this.canvas.width, this.canvas.height, 'hallwayA.png')
        this.view = new View(Game.loadNewImage('assets/img/backgrounds/hallwayA.png'))

        // Start the animation
        this.fillLists()

        console.log('start animation');
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
        // console.log(`playerY = ${this.player.y}`)
        this.player.update(this.canvas.width, this.canvas.height)
        if (this.getImgName(this.view.img).includes('A')) {
            this.doorAndLobbyDetection(this.doorLocationsLobbyA)
        } else if (this.getImgName(this.view.img).includes('B')) {
            this.doorAndLobbyDetection(this.doorLocationsLobbyB)
        }
        this.doorAndLobbyDetection(this.lobbies)
        this.returnToLobby()
    }

    public static test(x: number, y: number) {
        console.log(x)
    }


    public render() {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx, this.canvas.width, this.canvas.height)
        this.player.draw(ctx)
        ctx.beginPath();
        ctx.rect(this.canvas.width / 4.2, this.canvas.height / 2.07, 10, 10);
        ctx.stroke();
    }

    public doorAndLobbyDetection(list: collisionObj[]) {
        let playerX: number = this.player.x + (this.player.img.width / 2)
        let playerY: number = this.player.y + (this.player.img.height / 2)
        list.forEach((obj: collisionObj) => {
                if ((playerX >= obj.minX) && (playerX <= obj.maxX) && (playerY >= obj.minY) && (playerY <= obj.maxY)) {
                    switch (obj.name) {
                        case 'lobby':
                            switch (obj.img) {
                                case 'A':
                                    if (this.getImgName(this.view.img).includes('B')) {
                                        this.player.x = this.canvas.width / 29
                                        this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`))
                                        this.player.lobby = this.getImgName(this.view.img)
                                    }
                                    break
                                case 'B':
                                    if (this.getImgName(this.view.img).includes('A')) {
                                        this.player.x = this.canvas.width / 1.07
                                        this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`))
                                        this.player.lobby = this.getImgName(this.view.img)
                                    }
                                    break
                            }
                            break;
                        case 'door':
                            if (this.player.keyListener.isKeyDown(13)) {
                                this.view = new View(Game.loadNewImage(`assets/img/rooms/${obj.img}.jpg`))
                                this.player.inRoom = true;
                            }
                            break;
                    }

                }
            }
        )
    }


    public returnToLobby() {
        if (this.player.keyListener.isKeyDown(27)) {
            this.view = new View(Game.loadNewImage(`assets/img/backgrounds/${this.player.lobby}`))
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
        fontSize: number = 20,
        color: string = "red",
        alignment: CanvasTextAlign = "center"
    ) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
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

    public getImgName(img: HTMLImageElement): string {
        let fullPath = img.src;
        return fullPath.replace(/^.*[\\\/]/, '')
    }


    public fillLists() {
        this.lobbies = [
            {
                name: 'lobby',
                minX: 0,
                minY: 0,
                maxX: this.canvas.width / 30,
                maxY: this.canvas.height,
                img: 'B'
            },
            {
                name: 'lobby',
                minX: this.canvas.width / 1.05,
                minY: 0,
                maxX: this.canvas.width,
                maxY: this.canvas.height,
                img: 'A'
            }
        ]
        this.doorLocationsLobbyA = [
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
        this.doorLocationsLobbyB = [
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
                img: 'room6'
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
                minX: this.canvas.width / 2.05,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.85,
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
    img: string
}
