/// <reference path="Room.ts"/>
class RoomBeach402 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is deze man echt of nep?', 'Donald Trump was de president van amerika', 'Echt', 'Nep', undefined, undefined, Game.loadNewImage('assets/img/questionImages/trump.jpg')),
            new Question('Is deze man echt of nep?', 'Donald Trump was de president van amerika', 'Echt', 'Nep', undefined, undefined, Game.loadNewImage('assets/img/questionImages/trump.jpg')))

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

        super(room, questions, clickableItems, roomNumber);
    }
}
