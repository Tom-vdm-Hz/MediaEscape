/// <reference path="Room.ts"/>
class RoomPenthouse302 extends Room {
    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Bestaat deze man?', 'dit is een deepfake', 'Hij is Nep', 'Hij bestaat', 'Dit is een willekeurige foto', 'Een deepfake is een foto die is gemaakt door een computer', Game.loadNewImage('assets/img/questionImages/deepfake.jpg')),
            new Question('Wat is de beste manier voor een wachtwoord?', 'Gebruik bij iedere website een ander wachtwoord', 'Gerbuik altijd hetzelfde wachtwoord', 'Laat iemand anders jouw wachtwoord bedenken', 'Vertel iedereen je wachtwoord', 'Houd je wachtwoord altijd voor jezelf', Game.loadNewImage('assets/img/questionImages/wachtwoord.jpg')))

        let clickableItems: collisionObj[] = []
        clickableItems.push(
            {
                name: 'question',
                minX: canvasWidth / 3.18,
                minY: canvasHeight / 1.25,
                maxX: canvasWidth / 2.8,
                maxY: canvasHeight / 1.17,
            },
            {
                name: 'question',
                minX: canvasWidth / 1.12,
                minY: canvasHeight / 1.4,
                maxX: canvasWidth / 1.06,
                maxY: canvasHeight / 1.31,
            }
        )

        super(room, questions, clickableItems, roomNumber);
    }
}
