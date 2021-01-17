/// <reference path="Room.ts"/>
class RoomFuture301 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Hoe kun je zien of een post betrouwbaar is?', 'De bron is geverifieerd', 'De titel klinkt goed', 'Het leest lekker', 'Het wordt veel gedeeld', 'Bronnen van officiële organisaties zijn het meest betrouwbaar', undefined),
            new Question('Hoeveel tijd besteden jongeren vanaf 13+ dagelijks aan media?', 'Achtenhalf uur', 'vierenhalf uur', 'tienenhalf uur', 'tweeënhalf uur', 'Het is meer dan je denkt, maar onder de tien', undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 1.62,
                minY: canvasHeight / 2.71,
                maxX: canvasWidth / 1.44,
                maxY: canvasHeight / 1.87,
            },
            {
                name: 'question',
                minX: canvasWidth / 3.41,
                minY: canvasHeight / 1.85,
                maxX: canvasWidth / 3.27,
                maxY: canvasHeight / 1.78,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
