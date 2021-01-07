/// <reference path="./Point.ts"/>
/// <reference path="./Size.ts"/>
class Rectangle {
    private _point: Point
    private _size: Size

    constructor(x: number, y: number, w: number, h: number) {
        this._point = new Point(x, y);
        this._size = new Size(w, h);
    }


    get point(): Point {
        return this._point;
    }

    set point(value: Point) {
        this._point = value;
    }

    get size(): Size {
        return this._size;
    }

    set size(value: Size) {
        this._size = value;
    }
    
}