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
        let floorDivider: number = canvasHeight / 2.07;
        let feetLocation: number = this.y + this.img.height
        if (this.inRoom === false) {

            //a key is pressed
            if (this.keyListener.isKeyDown(65)) {
                if (this.x >= 0) {
                    this.x -= this.speed
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Left.png`)
            }

            //d key is pressed
            if (this.keyListener.isKeyDown(68)) {
                if (canvasWidth >= this.x + this._img.width) {
                    this.x += this.speed
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Right.png`)
            }

            //w key is pressed
            if (this.keyListener.isKeyDown(87)) {
                switch (this.lobby) {
                    case 'hallwayA.png':
                        if (this.x > canvasWidth / 1.15 && this.x < canvasWidth && this.y > floorDivider) {
                            this._x = canvasWidth / 1.15 - (this.img.width * 2)
                            this._y = canvasHeight / 2.07 - this.img.height
                        }
                        break;
                    case 'hallwayB.png':
                        if (this.x > 0 && this.x < canvasWidth / 8 && this.y > floorDivider) {
                            this._x = canvasWidth / 4.5 - this.img.width
                            this._y = canvasHeight / 2.07 - this.img.height
                        }
                        break;
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Back.png`)
            }

            //s key is pressed
            if (this.keyListener.isKeyDown(83)) {
                switch (this.lobby) {
                    case 'hallwayA.png':
                        if (this.x > canvasWidth / 1.3 && this.x < canvasWidth / 1.15 && this.y < floorDivider) {
                            this._x = canvasWidth / 1.1
                            this._y = canvasHeight - this.img.height
                        }
                        break;
                    case 'hallwayB.png':
                        if (this.x > canvasWidth / 8 && this.x < canvasWidth / 4.5 && this.y < floorDivider) {
                            this._x = canvasWidth / 8 - (this.img.width * 2)
                            this._y = canvasHeight - this.img.height
                        }
                        break;
                }

                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}Front.png`)
            }
            this.applySimpleGravity(canvasHeight, feetLocation, floorDivider)
        }
    }

    private applySimpleGravity(canvasHeight: number, feetLocation: number, floorDivider: number) {

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

