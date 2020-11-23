class PLayer {
    // The player on the canvas
    private _image: HTMLImageElement;
    private _x: number;
    private _y: number
    private _speed: number;
    private _keyListener: KeyListener;
    private _score: number = 0
    private _lives: number;


    constructor(image: HTMLImageElement, x: number, y: number, speed: number, lives: number) {
        this._image = image;
        this._x = x;
        this._y = y;
        this._speed = speed;
        this._lives = lives
        this._keyListener = new KeyListener();
    }

    public move(canvas: HTMLCanvasElement) {
        if (this._keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            if (this._x >= (this.image.width - (this.image.width / 2))) {
                this._x -= this._speed
            }
        }

        if (this._keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            if (this._x <= (canvas.width - this._image.width + (this.image.width / 2))) {
                this._x += this._speed
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.drawImage(
            this.image,
            this.x - this.image.width / 2,
            canvas.height - 150
        );
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


    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }


    get lives(): number {
        return this._lives;
    }

    set lives(value: number) {
        this._lives = value;
    }

    set speed(value: number) {
        this._speed = value;
    }


    get speed(): number {
        return this._speed;
    }
}
