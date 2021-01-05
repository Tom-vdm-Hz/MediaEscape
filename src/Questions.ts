class Questions {

    protected _extraInfo: string
    protected _answer: string
    
    public constructor(extrainfo: string, answer: string) {
        this._extraInfo = extrainfo
        this._answer = answer
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = "36px Arial";
        ctx.fillText("Test Text", 750, 450);
    }

    get extraInfo(): string {
        return this._extraInfo
    }

    set extraInfo(value: string) {
        this._extraInfo = value
    }

    get answer(): string {
        return this._answer
    }

    set answer(value: string) {
        this._answer = value
    }
}