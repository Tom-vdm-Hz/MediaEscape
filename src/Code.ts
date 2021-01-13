class Code {
    private _roomNum: number
    private _codeNum: number

    constructor(roomNum: number) {
        this._roomNum = roomNum;
    }

    get roomNum(): number {
        return this._roomNum;
    }

    set roomNum(value: number) {
        this._roomNum = value;
    }

    get codeNum(): number {
        return this._codeNum;
    }

    set codeNum(value: number) {
        this._codeNum = value;
    }
}
