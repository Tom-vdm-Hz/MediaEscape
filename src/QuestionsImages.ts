class ImageQuestions extends Questions {

    private _img: HTMLImageElement
    private _question: string

    public constructor(img: HTMLImageElement, question: string, extrainfo: string, answer: string) {
        super(extrainfo, answer);
        this._img = img
        this.question = question
        
    }

    get img(): HTMLImageElement {
        return this._img
    }

    set img(value: HTMLImageElement) {
        this._img = value
    }

    get question(): string {
        return this._question
    }

    set question(value: string) {
        this._question = value
    }

}