/// <reference path="Room.ts"/>
class RoomBath401 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Waarom maken mensen nepnieuws?', 'Ze willen er geld mee verdienen', 'Ze willen aandacht mee krijgen', 'Ze vinden het grappig om te doen', 'Ze willen dat mensen erin trappen', 'Bedenk wat er gebeurd als je klikt en gaat kijken naar nepnieuws', undefined),
            new Question('Hackers hebben altijd slechte bedoelingen?', 'Niet waar', 'Waar', undefined, undefined, 'Bedenk waar je hackers ook nog voor kan gebruiken in een bedrijf', undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push(
            {
                name: 'question',
                minX: canvasWidth / 5,
                minY: canvasHeight / 5,
                maxX: canvasWidth / 3,
                maxY: canvasHeight / 3,
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
