/// <reference path="Room.ts"/>
class RoomBasic303 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')),
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 6.7,
                minY: canvasHeight / 1.56,
                maxX: canvasWidth / 4.22,
                maxY: canvasHeight / 1.44,
            },
            {
                name: 'question',
                minX: canvasWidth / 2.52,
                minY: canvasHeight / 2.08,
                maxX: canvasWidth / 0.48,
                maxY: canvasHeight / 1.77,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
