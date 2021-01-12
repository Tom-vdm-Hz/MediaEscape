class Player {
    private readonly _playerName: string
    private _characterName: string
    private _img: HTMLImageElement;
    private _baseImg: HTMLImageElement = Game.loadNewImage(`assets/img/players/charaback.png`)
    private _collectedCodes: Code[] = []
    private _x: number
    private _y: number
    keyListener: KeyListener
    private speed: number = 4
    private _inRoom: boolean = false;
    private _lobby: string;
    private _lastWalkImg: number = 1

    constructor(name: string, characterName: string, img: HTMLImageElement, canvasWidth: number, canvasHeight: number, lobby: string) {
        this._playerName = name;
        this._characterName = characterName
        this._img = img;
        this._x = canvasWidth / 2
        this._y = canvasHeight / 1.35
        this.keyListener = new KeyListener
        this._lobby = lobby
    }

    public update(canvasWidth: number, canvasHeight: number) {
        this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}back.png`)
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
                this.walk('left')
            }

            //d key is pressed
            if (this.keyListener.isKeyDown(68)) {
                if (canvasWidth >= this.x + this._img.width) {
                    this.x += this.speed
                }
                this.walk('right')
            }

            //w key is pressed
            if (this.keyListener.isKeyDown(87)) {
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.x > canvasWidth / 1.15 && this.x < canvasWidth && this.y > floorDivider) {
                            this._x = canvasWidth / 1.15 - (this.img.width * 2)
                            this._y = canvasHeight / 2.07 - this.img.height
                        }
                        break;
                    case 'hallway2.png':
                        if (this.x > 0 && this.x < canvasWidth / 8 && this.y > floorDivider) {
                            this._x = canvasWidth / 4.5 - this.img.width
                            this._y = canvasHeight / 2.07 - this.img.height
                        }
                        break;
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}back.png`)
            }

            //s key is pressed
            if (this.keyListener.isKeyDown(83)) {
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.x > canvasWidth / 1.3 && this.x < canvasWidth / 1.15 && this.y < floorDivider) {
                            this._x = canvasWidth / 1.1
                            this._y = canvasHeight - this.img.height
                        }
                        break;
                    case 'hallway2.png':
                        if (this.x > canvasWidth / 8 && this.x < canvasWidth / 4.5 && this.y < floorDivider) {
                            this._x = canvasWidth / 8 - (this.img.width * 2)
                            this._y = canvasHeight - this.img.height
                        }
                        break;
                }

                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}front.png`)
            }
            this.applySimpleGravity(canvasHeight, feetLocation, floorDivider)
        }
    }

    private walk(direction: string) {
        let walkNum: number = this.walkNumCalculation();
        switch (direction) {
            case 'right':
                this.img = Game.loadNewImage(`assets/img/players/walkcycle${this.playerName}/right/char${this.playerName}${walkNum}right.png`)
                break;
            case 'left':
                this.img = Game.loadNewImage(`assets/img/players/walkcycle${this.playerName}/left/char${this.playerName}${walkNum}left.png`)
                break;
        }
        this.lastWalkImg++
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
            let h: number = 35
            this._collectedCodes.forEach(code => {
                Game.writeTextToCanvas(ctx, JSON.stringify(code.roomNum), 30, h)
                Game.writeTextToCanvas(ctx, '=', 70, h)
                if (code.codeNum != undefined) {
                    Game.writeTextToCanvas(ctx, JSON.stringify(code.codeNum), 95, h)
                }
                h += 35
            })
        }

    }

    private walkNumCalculation(): number {
        if (this.lastWalkImg >= 120) {
            this.lastWalkImg = 0
        }
        if (this.lastWalkImg < 15) {
            return 10;
        } else if (this.lastWalkImg > 15 && this.lastWalkImg < 30) {
            return 20;
        } else if (this.lastWalkImg > 30 && this.lastWalkImg < 45) {
            return 30
        } else if (this.lastWalkImg > 45 && this.lastWalkImg < 60) {
            return 40
        } else if (this.lastWalkImg > 60 && this.lastWalkImg < 75) {
            return 50
        } else if (this.lastWalkImg > 75 && this.lastWalkImg < 90) {
            return 60
        } else if (this.lastWalkImg > 90 && this.lastWalkImg < 105) {
            return 70
        } else if (this.lastWalkImg > 105 && this.lastWalkImg < 120) {
            return 80
        }
        return null
    }


    get lastWalkImg(): number {
        return this._lastWalkImg;
    }

    set lastWalkImg(value: number) {
        this._lastWalkImg = value;
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

    get baseImg(): HTMLImageElement {
        return this._baseImg;
    }


    get collectedCodes(): Code[] {
        return this._collectedCodes;
    }

    set collectedCodes(value: Code[]) {
        this._collectedCodes = value;
    }
}



