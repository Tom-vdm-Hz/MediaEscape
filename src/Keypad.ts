/// <reference path="View.ts"/>
class Keypad extends View {

    private _clickableItems: keypadNum[]
    private enteredCode: string = ''

    constructor(img: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        super(img);
        this._clickableItems = [{
            value: 1,
            minX: canvasWidth / 2.48,
            minY: canvasHeight / 1.54,
            maxX: canvasWidth / 2.1,
            maxY: canvasHeight / 1.4,
        }, {
            value: 2,
            minX: canvasWidth / 2.06,
            minY: canvasHeight / 1.54,
            maxX: canvasWidth / 1.8,
            maxY: canvasHeight / 1.4,
        }, {
            value: 3,
            minX: canvasWidth / 1.7,
            minY: canvasHeight / 1.54,
            maxX: canvasWidth / 1.5,
            maxY: canvasHeight / 1.4,
        }, {
            value: 4,
            minX: canvasWidth / 2.48,
            minY: canvasHeight / 1.73,
            maxX: canvasWidth / 2.1,
            maxY: canvasHeight / 1.55,
        }, {
            value: 5,
            minX: canvasWidth / 2,
            minY: canvasHeight / 1.73,
            maxX: canvasWidth / 2,
            maxY: canvasHeight / 1.55,
        }, {
            value: 6,
            minX: canvasWidth / 2,
            minY: canvasHeight / 1.73,
            maxX: canvasWidth / 1.6,
            maxY: canvasHeight / 1.55,
        }, {
            value: 7,
            minX: canvasWidth / 2.48,
            minY: canvasHeight / 1.97,
            maxX: canvasWidth / 2.1,
            maxY: canvasHeight / 1.75,
        }, {
            value: 8,
            minX: canvasWidth / 2,
            minY: canvasHeight / 1.97,
            maxX: canvasWidth / 2,
            maxY: canvasHeight / 1.75,
        }, {
            value: 9,
            minX: canvasWidth / 2,
            minY: canvasHeight / 1.97,
            maxX: canvasWidth / 2,
            maxY: canvasHeight / 1.75,
        },]
    }

    public checkCode(playerCode: Code[], vault: Vault) {
        let playerCodeString = ''
        playerCode.forEach(code => {
            playerCodeString += code.codeNum;
        })
        if (playerCodeString === this.enteredCode) {
            vault.isOpen = true
        }
    }

    public checkClick(x: number, y: number, type: string) {
        this._clickableItems.forEach(obj => {
            if ((x >= obj.minX) && (x <= obj.maxX) && (y >= obj.minY) && (y <= obj.maxY)) {
                if (type === 'click') {
                    this.enteredCode += JSON.stringify(obj.value)
                }
            }
        })
    }

    public deleteLastNum() {
        this.enteredCode.slice(this.enteredCode.length, 1)
    }

    public drawCode(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        Game.writeTextToCanvas(ctx, this.enteredCode, canvasWidth / 2, canvasHeight / 2)
    }


    get clickableItems(): keypadNum[] {
        return this._clickableItems;
    }
}

type keypadNum = {
    value: number,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
}
