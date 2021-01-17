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
                minX: canvasWidth / 12,
                minY: canvasHeight / 1.7,
                maxX: canvasWidth / 9,
                maxY: canvasHeight / 1.5,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.5,
                minY: canvasHeight / 1.35,
                maxX: canvasWidth / 1.4,
                maxY: canvasHeight / 1.3,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
