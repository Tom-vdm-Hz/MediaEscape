class Player {
    private readonly _playerName: string
    private _characterName: string
    private _img: HTMLImageElement;
    private _collectedCodes: number[]
    private _x: number
    private _y: number
    keyListener: KeyListener
    private speed: number = 3
    private _inRoom: boolean = false;
    private _lobby: string;

    constructor(name: string, characterName: string, img: HTMLImageElement, canvasWidth: number, canvasHeight: number, lobby: string) {
        this._playerName = name;
        this._characterName = characterName
        this._img = img;
        // this._x = (canvasWidth / 2) - (this._img.width / 2)
        // this._y = canvasHeight - this.img.height
        this._x = canvasWidth / 2
        this._y = canvasHeight - 231 //231 = img height
        this.keyListener = new KeyListener
        this._lobby = lobby

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


        let stairAMin1X: number = canvasWidth - (canvasWidth / 4.2)
        let stairAMin1Y: number = canvasHeight / 2.1
        let stairAMax1X: number = canvasWidth - (canvasWidth / 18)
        let stairAMax1Y: number = canvasHeight / 1.4

        let stairAMin2X: number = canvasWidth - (canvasWidth / 5.5)
        let stairAMin2Y: number = canvasHeight / 1.4
        let stairAMax2X: number = canvasWidth
        let stairAMax2Y: number = canvasHeight

        let stairBMin1X: number = canvasWidth / 4.2
        let stairBMin1Y: number = canvasHeight / 2.1
        let stairBMax1X: number = canvasWidth / 18
        let stairBMax1Y: number = canvasHeight / 1.4

        let stairBMin2X: number = canvasWidth / 5.5
        let stairBMin2Y: number = canvasHeight / 1.4
        let stairBMax2X: number = 0
        let stairBMax2Y: number = canvasHeight


        //a key is pressed
        if (this.keyListener.isKeyDown(65)) {
            if (this.x >= 0) {
                this.x -= this.speed
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Left.png`)
        }
        //w key is pressed
        if (this.keyListener.isKeyDown(87)) {
            if (this.y >= 0) {
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
            if (canvasHeight >= this.y + this._img.height) {
                this.y += this.speed
            }
            this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Front.png`)
        }

        this.applySimpleGravity(canvasHeight)
    }

    private applySimpleGravity(canvasHeight: number) {
        let floorDivider: number = canvasHeight / 2.07;
        let feetLocation: number = this.y + this.img.height
        if (feetLocation > floorDivider + 5 && feetLocation < canvasHeight) {
            this.y += 2;
        }
        if (feetLocation < floorDivider && feetLocation < floorDivider - 5) {
            this.y += 2;
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this._inRoom === false) {
            ctx.drawImage(this._img, this._x, this._y)
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y + this.img.height, 10, 10);
        ctx.stroke();
    }


    get playerName(): string {
        return this._playerName;
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


    get inRoom(): boolean {
        return this._inRoom;
    }

    set inRoom(value: boolean) {
        this._inRoom = value;
    }


    get lobby(): string {
        return this._lobby;
    }

    set lobby(value: string) {
        this._lobby = value;
    }
}

