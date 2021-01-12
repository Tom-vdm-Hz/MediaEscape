/// <reference path="Room.ts"/>
class RoomSky403 extends Room {

    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')),
            new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')))

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
