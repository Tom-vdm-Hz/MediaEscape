class FallingObj {
    private _image: HTMLImageElement;
    private _x: number;
    private _y: number;
    private readonly _speed: number;
    private readonly _type: string


    constructor(image: HTMLImageElement, canvas: HTMLCanvasElement, type: string) {
        this._image = image;
        this._x = this.randomInteger(0, canvas.width - this.image.width);
        this._y = this.image.height;
        this._speed = this.randomInteger(2, 5);
        this._type = type;
    }

    public move() {
        this._y += this._speed;
    }

    public playerCollision(canvas: HTMLCanvasElement, player: PLayer): boolean {
        return player.x < this._x + this._image.width
            && player.x + player.image.width > this._x
            && canvas.height - 100 < this._y + this._image.height
            && canvas.height - 100 + player.image.height > this._y;

    }

    public offCanvas(canvas: HTMLCanvasElement): boolean {
        return this._y + this._image.height > canvas.height
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this._image,
            this._x,
            this._y
        );
    }

    /**
     * Generates a random integer number between min and max
     *
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }


    get image(): HTMLImageElement {
        return this._image;
    }

    set image(value: HTMLImageElement) {
        this._image = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get type(): string {
        return this._type;
    }
}
