/// <reference path="View.ts"/>

class Room1 extends View {

    private mouseX: number
    private mouseY: number
    private mouseMove: any;
    private clickableItems: any;

    public constructor(room: HTMLImageElement, canvas: HTMLCanvasElement) {
        super(room)

        this.clickableItems = [
            {
                name: 'item1',
                minX: canvas.width / 100,
                minY: canvas.height / 100,
                maxX: canvas.width / 100,
                maxY: canvas.height / 100
            }
        ]
    };

    public getMousePosition(event: any) {
        this.mouseMove.addEventListener("mousemove", () => {
        this.mouseX = event.window.clientX
        this.mouseY = event.window.clientY
        console.log(this.mouseX, this.mouseY)
        })
    }    
    public clickedItem(event: any) {
        this.getMousePosition(event);
        this.clickableItems.forEach((item: any) => {
            if ((this.mouseX >= item.minX) &&
                (this.mouseY <= item.maxX) &&
                (this.mouseX >= item.minY) &&
                (this.mouseY <= item.maxY)) {
                alert("question placeholder")
            }
        }
    )} 
    
    
}



