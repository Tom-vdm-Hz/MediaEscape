/// <reference path="Room.ts"/>
class RoomBath401 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Waarom maken mensen nepnieuws?', 'test', 'Ze willen er geld mee verdienen', 'Ze vinden het grappig om te maken, Ze vinden het leuk als mensen erin trappen, Ze willen aandacht krijgen'),
            new Question('test', 'test', 'test', 'test', Game.loadNewImage('assets/img/questionImages/imgName.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 35,
                minY: canvasHeight / 1.7,
                maxX: canvasWidth / 6,
                maxY: canvasHeight / 1.1,
            },
            {
                name: 'question',
                minX: canvasWidth / 3.4,
                minY: canvasHeight / 1.7,
                maxX: canvasWidth / 2.25,
                maxY: canvasHeight / 1.1,
            })

        super(room, questions, clickableItems);
    }
}
