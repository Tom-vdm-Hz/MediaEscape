/// <reference path="Room.ts"/>
class RoomBasic303 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Is social media een betrouwbare bron?', 'Nee', 'Ja', undefined, undefined, 'Er gaan veel neppe artikels rond via social media.', undefined),
            new Question('Zijn de bovenste zoekresultaten altijd de beste?', 'Nee, want er wordt voor de plek betaald', 'Ja, want ze staan bovenaan', 'Ja, want ze zijn relevant', 'Nee, het zijn reclames', 'De bovenste resultaten zijn vaak geplaatst met zichtbaarheid in gedachte, in plaats van relevantie.', undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 4.1,
                minY: canvasHeight / 2.56,
                maxX: canvasWidth / 3.66,
                maxY: canvasHeight / 2.18,
            },
            {
                name: 'question',
                minX: canvasWidth / 2,
                minY: canvasHeight / 6.4,
                maxX: canvasWidth / 1.95,
                maxY: canvasHeight / 5.35,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
