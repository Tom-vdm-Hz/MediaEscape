/// <reference path="Room.ts"/>
class RoomBath401 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Waarom maken mensen nepnieuws?', 'Ze willen er geld mee verdienen', 'Ze willen er aandacht mee krijgen', 'Ze vinden het grappig om te doen', 'Ze willen dat mensen erin trappen', 'Bedenk wat er gebeurt als je klikt en gaat kijken naar nepnieuws', undefined),
            new Question('Hackers hebben altijd slechte bedoelingen', 'Niet waar', 'Waar', undefined, undefined, 'Bedenk waar je hackers ook nog voor kan gebruiken in een bedrijf', undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push(
            {
                name: 'question',
                minX: canvasWidth / 2.33,
                minY: canvasHeight / 2.6,
                maxX: canvasWidth / 2.2,
                maxY: canvasHeight / 2.1,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.23,
                minY: canvasHeight / 1.15,
                maxX: canvasWidth / 1.13,
                maxY: canvasHeight / 1.03,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
