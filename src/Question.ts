class Question {

    private readonly _question: string
    private readonly _extraInfo: string
    private readonly _goodAnswer: string;
    private readonly _badAnswer1: string
    private readonly _badAnswer2: string
    private readonly _badAnswer3: string
    private readonly _img: HTMLImageElement
    private _showHint: boolean = false;

    public constructor(question: string, goodAnswer: string, badAnswer1: string, badAnswer2?: string, badAnswer3?: string, extraInfo?: string, img?: HTMLImageElement) {
        this._badAnswer1 = badAnswer1
        this._badAnswer2 = badAnswer2
        this._badAnswer3 = badAnswer3
        this._goodAnswer = goodAnswer
        this._extraInfo = extraInfo
        this._question = question
        this._img = img
    }

    get question(): string {
        return this._question;
    }

    get extraInfo(): string {
        return this._extraInfo;
    }

    get img(): HTMLImageElement {
        return this._img;
    }


    get goodAnswer(): string {
        return this._goodAnswer;
    }


    get badAnswer1(): string {
        return this._badAnswer1;
    }

    get badAnswer2(): string {
        return this._badAnswer2;
    }

    get badAnswer3(): string {
        return this._badAnswer3;
    }


    get showHint(): boolean {
        return this._showHint;
    }

    set showHint(value: boolean) {
        this._showHint = value;
    }
}

