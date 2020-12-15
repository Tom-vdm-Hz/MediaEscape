class Player {
    private name: string
    private readonly img: HTMLImageElement;
    private collectedCodes: number[]
    private x: number
    private y: number
    private keyListener: KeyListener

    constructor(name: string, img: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        this.name = name;
        this.img = img;
        this.x = (canvasWidth / 2) + this.img.width / 2
        this.y = canvasHeight - img.height
        this.keyListener = new KeyListener
    }

    public move() {
        //left key is pressed
        if (this.keyListener.isKeyDown(37) == true) {
            console.log('left')
        }
        //up key is pressed
        if (this.keyListener.isKeyDown(38) == true) {
            console.log('up')
        }
        //right key is pressed
        if (this.keyListener.isKeyDown(39) == true) {
            console.log('right')
        }
        //down key is pressed
        if (this.keyListener.isKeyDown(40) == true) {
            console.log('down')
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

