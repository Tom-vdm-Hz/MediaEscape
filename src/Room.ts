/// <reference path="View.ts"/>

class Room extends View {


    private questions: Question[]
    private clickableItems: collisionObj[]


    public constructor(room: HTMLImageElement, questions: Question[], clickableItems: collisionObj[]) {
        super(room)
        this.questions = questions
        this.clickableItems = clickableItems
    };

    public checkClick(x: number, y: number): Question {
        let question: Question;
        this.clickableItems.forEach(obj => {
            if ((x >= obj.minX) && (x <= obj.maxX) && (y >= obj.minY) && (y <= obj.maxY)) {
                question = this.questions[Math.floor(Math.random() * this.questions.length)]
            }
        })
        return question
    }


}



