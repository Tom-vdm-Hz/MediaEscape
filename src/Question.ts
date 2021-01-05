class Question {

    private readonly _question: string
    private readonly _extraInfo: string
    private readonly _answer: string
    private readonly _img: HTMLImageElement

    public constructor(question: string, extraInfo: string, answer: string, img?: HTMLImageElement) {
        this._extraInfo = extraInfo
        this._answer = answer
        this._question = question
        this._img = img
    }

    public draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        ctx.font = "36px Arial";
        ctx.fillText("Test Text", 750, 450);
    }


    get question(): string {
        return this._question;
    }

    get extraInfo(): string {
        return this._extraInfo;
    }

    get answer(): string {
        return this._answer;
    }

    get img(): HTMLImageElement {
        return this._img;
    }
}
