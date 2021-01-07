/// <reference path="Room.ts"/>
class RoomBath401 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question(canvasWidth, canvasHeight, 'Waarom maken mensen nepnieuws?', 'Donald Trump was de president van amerika', 'Ze willen er geld mee verdienen.', 'Ze willen aandacht mee krijgen.'),
            new Question(canvasWidth, canvasHeight, 'Is deze man echt of nep?', 'Donald Trump was de president van amerika', 'Echt', 'Nep'))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 35,
                minY: canvasHeight / 1.7,
                maxX: canvasWidth / 30,
                maxY: canvasHeight / 1.6,
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
