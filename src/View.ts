class View {
    private readonly img: HTMLImageElement;


    constructor(img: HTMLImageElement) {
        this.img = img;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, 0, 0)
    }
}
