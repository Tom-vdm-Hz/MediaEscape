class Player {
    private _playerName: string
    private _characterName: string
    private _img: HTMLImageElement;
    private _collectedCodes: number[]
    private _x: number
    private _y: number
    private _view: View;
    keyListener: KeyListener
    private speed: number = 3
    private _inRoom: boolean = false;

    constructor(name: string, charachterName: string, img: HTMLImageElement, canvasWidth: number, canvasHeight: number, view: View) {
        this._playerName = name;
        this._view = view
        this._characterName = charachterName
        this._img = img;


        this._x = (canvasWidth / 2) - (this._img.width / 2)
        this._y = 500
        this.keyListener = new KeyListener
    }

    public update(canvasWidth: number, canvasHeight: number) {
        this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Back.png`)
        this.move(canvasWidth, canvasHeight)
    }

    private move(canvasWidth: number, canvasHeight: number) {
        let stairStart: number = canvasWidth - (canvasWidth / 5)
        let groundFloorMin: number = canvasHeight
        let groundFloorMax: number = canvasHeight - this.img.height
        let firstFloorMin: number = canvasHeight / 2
        let firstFloorMax: number = (canvasHeight / 2) - this.img.height
        //a key is pressed
        if (this.keyListener.isKeyDown(65)) {
            if (this.x >= 0) {
                if ((this.y + this.img.height >= firstFloorMax && this.y + this.img.height <= firstFloorMin) ||
                    (this.y + this.img.height >= groundFloorMax && this.y + this.img.height <= groundFloorMin) ||
                    (this.x >= stairStart)) {
                    this.x -= this.speed
                }
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Left.png`)
        }
        //w key is pressed
        if (this.keyListener.isKeyDown(87)) {
            if (this.y >= 0 && this.x >= stairStart) {
                this.y -= this.speed
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Back.png`)
        }
        //d key is pressed
        if (this.keyListener.isKeyDown(68)) {
            if (canvasWidth >= this.x + this._img.width) {
                this.x += this.speed
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Right.png`)
        }
        //s key is pressed
        if (this.keyListener.isKeyDown(83)) {
            if (canvasHeight >= this.y + this._img.height && this.x >= stairStart) {
                this.y += this.speed
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Front.png`)
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this._inRoom === false) {
            ctx.drawImage(this._img, this._x, this._y)
        }
    }


    get playerName(): string {
        return this._playerName;
    }

    set playerName(value: string) {
        this._playerName = value;
    }

    get collectedCodes(): number[] {
        return this._collectedCodes;
    }

    set collectedCodes(value: number[]) {
        this._collectedCodes = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }


    get img(): HTMLImageElement {
        return this._img;
    }

    set img(value: HTMLImageElement) {
        this._img = value;
    }

    get characterName(): string {
        return this._characterName;
    }

    set characterName(value: string) {
        this._characterName = value;
    }


    set view(value: View) {
        this._view = value;
    }


    get inRoom(): boolean {
        return this._inRoom;
    }

    set inRoom(value: boolean) {
        this._inRoom = value;
    }
}

