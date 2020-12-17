/// <reference path="View.ts"/>

class Room1 extends View {

    private mouseX: number;
    private mouseY: number;
    private clickableItems: any;

    public constructor(room: HTMLImageElement, canvas: HTMLCanvasElement) {
        super(room)

        this.clickableItems = [
            {
                name: 'item1',
                minX: 100,
                minY: 100,
                maxX: 100,
                maxY: 100,
            }
        ]
    };

    public clickHandler(event: any) {
        this.clickableItems.item1.addEventListener('click', () => {
            alert('question placeholder');
        })
        
    }
}



