class Game {

    // The canvas
    private readonly canvas: HTMLCanvasElement;

    private player: PLayer;
    private fallingObjects: FallingObj[] = [];
    private frame: number = 0;
    private newLife: number = 500

    private lvlUp: number = 20;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        this.canvas.width = window.innerWidth / 2;
        this.canvas.height = window.innerHeight;

        this.createFallingObj('trophy')
        this.createPlayer();

        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);
    }


    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {
        this.player.move(this.canvas)
        this.fallingObjects.forEach((fallingObj) => {
            fallingObj.move()
        })
        this.render()
        this.checkBoosts()
        this.checkCollisions()
        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        if (this.player.lives === 0) {
            this.gameOver()
        } else {
            this.frame += 1;
            requestAnimationFrame(this.step);
        }

    }

    public checkBoosts() {
        if (this.player.score === this.lvlUp) {
            this.createFallingObj('trophy')
            this.createFallingObj('speedBoost')
            this.lvlUp += 20
        }
        if (this.frame === this.newLife) {
            this.createFallingObj('extraLife')
            this.newLife += 500
        }
    }

    public checkCollisions() {
        this.fallingObjects.forEach((fallingObj) => {
            switch (fallingObj.type) {
                case'extraLife':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.lives += 1;
                        this.removeFallingObj(fallingObj)
                    }
                    break;
                case'speedBoost':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.speed += 1
                        this.removeFallingObj(fallingObj)
                    }
                    break;
                case'trophy':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.score += 1;
                        this.removeFallingObj(fallingObj)
                        this.createFallingObj('trophy')
                    }
                    break;
            }
            if (fallingObj.offCanvas(this.canvas) == true) {
                if (fallingObj.type === 'trophy') {
                    this.player.lives -= 1;
                    this.createFallingObj('trophy')
                }
                this.removeFallingObj(fallingObj)
            }
        })
    }


    public createFallingObj(type: string) {
        let fallingObj: FallingObj;
        let img: HTMLImageElement;
        switch (type) {
            case'speedBoost':
                img = Game.loadNewImage("assets/img/objects/face_on_blue_power_icon.png")
                fallingObj = new FallingObj(img, this.canvas, 'speedBoost')
                break;
            case'extraLife':
                img = Game.loadNewImage("assets/img/objects/face_on_heart.png")
                fallingObj = new FallingObj(img, this.canvas, 'extraLife')
                break;
            case'trophy':
                img = Game.loadNewImage("assets/img/objects/gold_trophy.png")
                fallingObj = new FallingObj(img, this.canvas, 'trophy')
                break;
        }
        this.fallingObjects.push(fallingObj)
    }

    public createPlayer() {
        let img: HTMLImageElement = Game.loadNewImage("./assets/img/players/character_robot_walk0.png")
        this.player = new PLayer(img, (this.canvas.width / 2) - img.width, this.canvas.height - img.height, 4, 5)
    }

    public removeFallingObj(fallingObj: FallingObj) {
        this.fallingObjects.splice(this.fallingObjects.indexOf(fallingObj), 1)
    }

    public gameOver() {
        document.getElementById('tudo').classList.remove('hidden')
        document.getElementById('score').innerHTML = `${this.player.score}`;
        document.getElementById('canvas').classList.add('hidden')
    }

    public render() {
        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(ctx, this.canvas);
        this.fallingObjects.forEach((trophy) => {
            trophy.draw(ctx)
        })
        this.writeTextToCanvas(ctx, "Use Arrow keys to move", 100, 40, 14);
        this.writeTextToCanvas(ctx, `SCORE: ${this.player.score}`, this.canvas.width - 50, 40, 14);
        this.writeTextToCanvas(ctx, `LIVES: ${this.player.lives}`, this.canvas.width - 50, 80, 14);
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
    private static loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

}
