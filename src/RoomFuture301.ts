/// <reference path="Room.ts"/>
class RoomFuture301 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')),
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 4.4,
                minY: canvasHeight / 1.36,
                maxX: canvasWidth / 3.77,
                maxY: canvasHeight / 1.51,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.49,
                minY: canvasHeight / 2.15,
                maxX: canvasWidth / 1.32,
                maxY: canvasHeight / 1.66,
            })

        super(room, questions, clickableItems);
    }
}
