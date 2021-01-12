/// <reference path="Room.ts"/>
class RoomBath401 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Waarom maken mensen nepnieuws?', 'Donald Trump was de president van amerika', 'Ze willen er geld mee verdienen.', 'Ze willen aandacht mee krijgen.', undefined, undefined, undefined),
            new Question('Hackers hebben altijd slechte bedoelingen?', 'Donald Trump was de president van amerika', 'waar', 'Niet waar', undefined, undefined, undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 20,
                minY: canvasHeight / 45,
                maxX: canvasWidth / 15,
                maxY: canvasHeight / 40,
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
