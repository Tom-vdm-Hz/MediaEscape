class Player {
    private name: string
    private readonly img: HTMLImageElement;
    private collectedCodes: number[]
    private x: number
    private y: number


    constructor(name: string, img: HTMLImageElement, x: number, y: number) {
        this.name = name;
        this.img = img;
        this.x = x
        this.y = y
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y)
    }
}
