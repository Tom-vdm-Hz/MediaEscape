/// <reference path="Room.ts"/>
class RoomBeach402 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Je ziet de volgende advertentie, wat doe je?', 'Je negeert de advertentie', 'Je klikt op de advertentie', 'Je gooit je telefoon weg', 'Je klikt op de advertentie maar verwacht niks', 'Wat doe je als iets je niet intreseert?', Game.loadNewImage('assets/img/questionImages/geldreclame.jpg')),
            new Question('Je krijgt een raare e-mail van een arabische prins, wat doe je?', 'Je verwijdert de e-mail', 'Je doet wat de prins zegt', 'Je negeert de e-mail', 'Je reageert op de mail', 'Is dit wel een arabische prins?', Game.loadNewImage('assets/img/questionImages/prins.png')))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: 0,
                minY: canvasHeight / 2.2,
                maxX: canvasWidth / 10,
                maxY: canvasHeight / 1.05,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.6,
                minY: canvasHeight / 1.2,
                maxX: canvasWidth / 1.5,
                maxY: canvasHeight / 1.1,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
