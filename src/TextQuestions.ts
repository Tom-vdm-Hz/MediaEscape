class TextQuestions extends Questions {
    
    private _question: string

    public constructor(question: string, extrainfo: string, answer: string) {
        super(extrainfo, answer);
        this._question = question
    }

    get question(): string {
        return this._question
    }

    set question(value: string) {
        this._question = value
    }
}