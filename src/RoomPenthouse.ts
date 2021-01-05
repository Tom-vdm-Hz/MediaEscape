/// <reference path="Room.ts"/>
class RoomPenthouse extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('test', 'test', 'test'),
            new Question('test1', 'test1', 'test1', Game.loadNewImage('assets/img/questionImages/imgName.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 1.12,
                minY: canvasHeight / 1.4,
                maxX: canvasWidth / 1.06,
                maxY: canvasHeight / 1.31,
            },
            {
                name: 'question',
                minX: canvasWidth / 3.18,
                minY: canvasHeight / 1.25,
                maxX: canvasWidth / 2.8,
                maxY: canvasHeight / 1.17,
            })

        super(room, questions, clickableItems);
    }
}
