/// <reference path="View.ts"/>

class Room extends View {

    private _questions: Question[]
    private _clickableItems: collisionObj[]
    private _lastClickedObj: collisionObj;

    public constructor(room: HTMLImageElement, questions: Question[], clickableItems: collisionObj[]) {
        super(room)
        this._questions = questions
        this._clickableItems = clickableItems
    };

    public checkClick(x: number, y: number, type: string): Question {
        let question: Question;
        if (type === 'hover') {
            document.getElementById('canvas').style.cursor = 'default'
        }
        this._clickableItems.forEach(obj => {
            if ((x >= obj.minX) && (x <= obj.maxX) && (y >= obj.minY) && (y <= obj.maxY)) {
                switch (type) {
                    case 'click':
                        this._lastClickedObj = obj
                        question = this._questions[Math.floor(Math.random() * this._questions.length)]
                        this.showQuestion()
                        document.getElementById("questionText").innerHTML = question.question
                        this.hideExtraAnswerAndImg()
                        if (this.getRndInteger(1, 3) === 1) {
                            document.getElementById("awnser1").innerHTML = question.badAnswer1
                            document.getElementById("awnser2").innerHTML = question.goodAnswer;
                        } else {
                            document.getElementById("awnser2").innerHTML = question.badAnswer1
                            document.getElementById("awnser1").innerHTML = question.goodAnswer;
                        }
                        if (question.badAnswer2 || question.badAnswer3 != undefined) {
                            document.getElementById("awnser3").innerHTML = question.badAnswer2
                            document.getElementById("awnser4").innerHTML = question.badAnswer3
                            document.getElementById('awnser3').classList.remove('hidden')
                            document.getElementById('awnser3').classList.add('visible')
                            document.getElementById('awnser4').classList.remove('hidden')
                            document.getElementById('awnser4').classList.add('visible')
                        }
                        document.getElementById("hintText").innerHTML = question.extraInfo;
                        if (question.img != undefined) {
                            document.getElementById("questionImg").classList.add('visible');
                            document.getElementById("questionImg").classList.remove('hidden');
                            (document.getElementById("questionImg") as HTMLImageElement).src = question.img.src
                        }
                        break;
                    case 'hover':
                        document.getElementById('canvas').style.cursor = 'zoom-in'
                        break;
                }
            }
        })
        return question
    }


    public hideExtraAnswerAndImg() {
        document.getElementById("questionImg").classList.remove('visible')
        document.getElementById("questionImg").classList.add('hidden')
        document.getElementById('awnser3').classList.add('hidden')
        document.getElementById('awnser3').classList.remove('visible')
        document.getElementById('awnser4').classList.add('hidden')
        document.getElementById('awnser4').classList.remove('visible')
    }

    public showQuestion() {
        document.getElementById("canvas").classList.add("hidden");
        document.getElementById("canvas").classList.remove("visible");
        document.getElementById("canvas").classList.remove("block");
        document.getElementById("question").classList.remove("hidden");
        document.getElementById("question").classList.add("visible");
        document.body.style.backgroundImage = `url('${this.img.src}')`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center center';
    }

    public hideQuestion() {
        document.getElementById("canvas").classList.remove("hidden");
        document.getElementById("canvas").classList.add("visible");
        document.getElementById("canvas").classList.add("block");
        document.getElementById("question").classList.add("hidden");
        document.getElementById("question").classList.remove("visible");
    }

    public getRndInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    get questions(): Question[] {
        return this._questions;
    }

    set questions(value: Question[]) {
        this._questions = value;
    }

    get clickableItems(): collisionObj[] {
        return this._clickableItems;
    }

    set clickableItems(value: collisionObj[]) {
        this._clickableItems = value;
    }

    get lastClickedObj(): collisionObj {
        return this._lastClickedObj;
    }

    set lastClickedObj(value: collisionObj) {
        this._lastClickedObj = value;
    }
}



