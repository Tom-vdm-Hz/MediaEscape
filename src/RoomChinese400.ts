/// <reference path="Room.ts"/>
class RoomChinese400 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Verdienen youtubers veel geld met het maken van filmpjes?', 'ja', 'nee', undefined, undefined, 'per 1000 views kan je tussen de 30 cent en 4 euro verdienen', Game.loadNewImage('assets/img/questionImages/youtube.png')),
            new Question('Wat mag je sinds 1 juli 2019 niet meer doen op de fiets?', 'Je telefoon gebruiken', 'Zonder handen fietsen', 'Bellen met je fietsbel', 'Iemand meenemen op je bagagedrager', 'Wat mag je ook niet doen achter het stuur in de auto?', Game.loadNewImage('assets/img/questionImages/fietsen.jpg')))


        let clickableItems: collisionObj[] = []
        clickableItems.push(
            {
                name: 'question',
                minX: canvasWidth / 2.3,
                minY: canvasHeight / 2.35,
                maxX: canvasWidth / 1.83,
                maxY: canvasHeight / 1.78,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.12,
                minY: canvasHeight / 1.4,
                maxX: canvasWidth / 1.06,
                maxY: canvasHeight / 1.31,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
