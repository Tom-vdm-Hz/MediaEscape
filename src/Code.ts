class Code {
    private _roomNum: number
    private _codeNum: number

    constructor(roomNum: number) {
        this._roomNum = roomNum;
        this.codeNum = Room.getRndInteger(1, 10)
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
