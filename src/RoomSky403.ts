/// <reference path="Room.ts"/>
class RoomSky403 extends Room {

    constructor(room: HTMLImageElement, canvasWidth: number, canvasHeight: number, roomNumber: number) {
        let questions: Question[] = []
        questions.push(
            new Question('Wat is de gemiddelde leeftijd dat kinderen voor het eerst zelfstandig achter de computer zitten?', '4', '2', '5', '7', 'Ouder dan 2 en jonger dan 7', undefined),
            new Question('Vanaf welke leeftijd begint de belangstelling van baby’s voor tablets?', 'Tussen de 3 en 5 maanden', 'Tussen de 5 en 7 maanden', 'Tussen de 7 en 10 maanden', 'Tussen de 10 en 12 maanden', 'Het is jonger dan je denkt', undefined))

        let clickableItems: collisionObj[] = []
        clickableItems.push({
                name: 'question',
                minX: canvasWidth / 15,
                minY: canvasHeight / 1.2,
                maxX: canvasWidth / 7,
                maxY: canvasHeight / 1.08,
            },
            {
                name: 'question',
                minX: canvasWidth / 2,
                minY: canvasHeight / 1.45,
                maxX: canvasWidth / 1.85,
                maxY: canvasHeight / 1.35,
            })

        super(room, questions, clickableItems, roomNumber);
    }
}
