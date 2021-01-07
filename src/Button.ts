/// <reference path="Rectangle.ts"/>
class Button {

    private rectangle: Rectangle;
    private readonly text: string


    constructor(x: number, y: number, w: number, h: number, text: string) {
        this.rectangle = new Rectangle(x, y, w, h);
        this.text = text;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.rectangle.point.x, this.rectangle.point.y, this.rectangle.size.width, this.rectangle.size.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillStyle = 'rgba(225,225,225,0.5)';
        ctx.fillRect(this.rectangle.point.x, this.rectangle.point.y, this.rectangle.size.width, this.rectangle.size.height);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.closePath();
        ctx.font = '40pt Kremlin Pro Web';
        ctx.fillStyle = '#000000';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, this.rectangle.point.x + (this.rectangle.size.width / 2), this.rectangle.point.y + (this.rectangle.size.height / 2))
    }

    public checkClick(mouseX: number, mouseY: number): boolean {
        return mouseX > this.rectangle.point.x && mouseX < this.rectangle.point.x + this.rectangle.size.width && mouseY < this.rectangle.point.y + this.rectangle.size.height && mouseY > this.rectangle.point.y
    }
}
