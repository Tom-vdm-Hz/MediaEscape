/// <reference path="View.ts"/>
class Vault extends View {

    private _isOpen: boolean = false

    constructor(img: HTMLImageElement) {
        super(img);
    }


    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(value: boolean) {
        this._isOpen = value;
    }
}
