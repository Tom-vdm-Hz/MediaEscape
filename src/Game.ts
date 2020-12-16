class Game {

    private player: Player;
    private view: View;
    private readonly canvas: HTMLCanvasElement;
    private doorLocations: any;

    public constructor(canvas: HTMLElement, playerName: string, characterName: string) {
        this.canvas = <HTMLCanvasElement>canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.view = new View(Game.loadNewImage('assets/img/backgrounds/hallwayA.png'))
        this.player = new Player(playerName, characterName, Game.loadNewImage(`assets/img/players/char${characterName}Back.png`), this.canvas.width, this.canvas.height, this.view)
        // Start the animation
        this.doorLocations = [
            {
                name: 'door1',
                minX: this.canvas.width / 35,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 6,
                maxY: this.canvas.height / 1.1,
                room: 'room1'
            },
            {
                name: 'door2',
                minX: this.canvas.width / 3.4,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 2.25,
                maxY: this.canvas.height / 1.1,
                room: 'room2'
            },
            {
                name: 'door3',
                minX: this.canvas.width / 1.85,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.45,
                maxY: this.canvas.height / 1.1,
                room: 'room3'
            },
            {
                name: 'door4',
                minX: this.canvas.width / 6,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 3.2,
                maxY: this.canvas.height / 2,
                room: 'room4'
            },
            {
                name: 'door5',
                minX: this.canvas.width / 6,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.76,
                maxY: this.canvas.height / 2,
                room: 'room5'
            },
        ]
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
        this.player.update(this.canvas.width, this.canvas.height)
        this.doorDetection()
        this.returnToLobby()
    }


    public render() {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.view.draw(ctx, this.canvas.width, this.canvas.height)
        this.player.draw(ctx)
    }

    public doorDetection() {
        let playerX: number = this.player.x + (this.player.img.width / 2)
        let playerY: number = this.player.y + (this.player.img.height / 2)
        this.doorLocations.forEach((door: any) => {
                if ((playerX >= door.minX) && (playerX <= door.maxX) && (playerY >= door.minY) && (playerY <= door.maxY)) {
                    if (this.player.keyListener.isKeyDown(13)) {
                        this.view = new View(Game.loadNewImage(`assets/img/rooms/${door.room}.jpg`))
                        this.player.inRoom = true;
                    }
                }
            }
        )
    }

    public returnToLobby() {
        if (this.player.keyListener.isKeyDown(27)) {
            console.log('a')
            this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallwayA.png`))
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
    public writeTextToCanvas(
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

}
