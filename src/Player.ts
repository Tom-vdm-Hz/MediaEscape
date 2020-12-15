class Player {
    private name: string
    private readonly img: HTMLImageElement;
    private collectedCodes: number[]
    private x: number
    private y: number


    constructor(name: string, img: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        this.name = name;
        this.img = img;
        this.x = (canvasWidth / 2) + this.img.width / 2
        this.y = canvasHeight - img.height
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}
