class Questions {

    protected _extraInfo: string
    protected _answer: string
    public constructor(extrainfo: string, answer: string) {
        this._extraInfo = extrainfo
        this._answer = answer
    }

    public draw() {
        var canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
        var context = canvas.getContext('2d');
    
        context.font = "20px Calibri";
        context.fillText("Test Text", 100, 200);
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