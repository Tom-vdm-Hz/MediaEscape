/// <reference path="Room.ts"/>
class RoomChinese400 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')),
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push(
            {
                name: 'question',
                minX: canvasWidth / 3.18,
                minY: canvasHeight / 1.25,
                maxX: canvasWidth / 2.8,
                maxY: canvasHeight / 1.17,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.12,
                minY: canvasHeight / 1.4,
                maxX: canvasWidth / 1.06,
                maxY: canvasHeight / 1.31,
            })

        super(room, questions, clickableItems);
    }
}
