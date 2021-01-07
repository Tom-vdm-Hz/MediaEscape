class Question {

    private readonly _question: string
    private readonly _extraInfo: string
    private readonly _goodAnswer: Button;
    private readonly _badAnswer: Button
    private readonly _img: HTMLImageElement

    public constructor(canvasWidth: number, canvasHeight: number, question: string, extraInfo: string, goodAnswer: string, badAnswer: string, img?: HTMLImageElement) {
        let ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
        this._badAnswer = new Button(canvasWidth / 1.6 - ((canvasWidth / 10) / 2), canvasHeight / 1.2, canvasWidth / 10, 50, badAnswer)
        this._goodAnswer = new Button(canvasWidth / 2.4 - ((canvasWidth / 10 / 2)), canvasHeight / 1.2, canvasWidth / 10, 50, goodAnswer)
        this._extraInfo = extraInfo
        this._question = question
        this._img = img
    }


    public draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        Game.writeTextToCanvas(ctx, this.question, canvasWidth / 2, canvasHeight / 4)
        this.goodAnswer.draw(ctx)
        this.badAnswer.draw(ctx)
        if (this.img != undefined) {
            ctx.drawImage(this.img, canvasWidth / 2 - (this.img.width / 2), canvasHeight / 2 - (this.img.height / 2))
        }
    }

    public checkAnswer(x: number, y: number, type: string): boolean {
        if (this.badAnswer.checkClick(x, y)) {
            if (type === 'click') {
                alert('Verkeerd Antwoord')
                return false
            } else {
                document.getElementById('canvas').style.cursor = 'pointer'
            }
        } else if (this.goodAnswer.checkClick(x, y)) {
            if (type === 'click') {
                alert('Goed Antwoord')
                return true
            } else {
                document.getElementById('canvas').style.cursor = 'pointer'
            }
        } else {
            document.getElementById('canvas').style.cursor = 'default'
        }
        return null
    }


    get question(): string {
        return this._question;
    }

    get extraInfo(): string {
        return this._extraInfo;
    }


    get goodAnswer(): Button {
        return this._goodAnswer;
    }

    get badAnswer(): Button {
        return this._badAnswer;
    }

    get img(): HTMLImageElement {
        return this._img;
    }
}

type coordinates = {
    minX: number
    minY: number
    maxX: number
    maxY: number
}
