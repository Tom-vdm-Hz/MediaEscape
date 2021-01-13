class Game {
    constructor(canvas, playerName, characterName, windowHeight, windowWidth) {
        this.rooms = [];
        this.listsLoaded = 0;
        this.step = () => {
            this.update();
            this.render();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
        this.player = new Player(playerName, characterName, Game.loadNewImage(`assets/img/players/char${characterName}back.png`), this.canvas.width, this.canvas.height, 'hallway1.png');
        this.view = new View(Game.loadNewImage('assets/img/backgrounds/hallway1.png'));
        this.createRooms();
        requestAnimationFrame(this.step);
    }
    update() {
        if (this.listsLoaded != 2) {
            this.fillLists();
            this.listsLoaded++;
        }
        this.player.update(this.canvas.width, this.canvas.height);
        if (this.getImgName(this.view.img).includes('1')) {
            this.doorAndLobbyDetection(this.doorLocationsLobby1);
        }
        else if (this.getImgName(this.view.img).includes('2')) {
            this.doorAndLobbyDetection(this.doorLocationsLobby2);
        }
        this.doorAndLobbyDetection(this.lobbies);
        this.returnToLobby();
    }
    checkAnswer(button, answer) {
        if (this.activeQuestion.goodAnswer === answer) {
            alert('Goed Antwoord');
            this.activeRoom.hideQuestion();
            this.activeRoom.questions.splice(this.activeRoom.questions.indexOf(this.activeQuestion), 1);
            this.activeRoom.clickableItems.splice(this.activeRoom.clickableItems.indexOf(this.activeRoom.lastClickedObj), 1);
            this.activeQuestion = undefined;
            if (this.activeRoom.questions.length === 0) {
                alert('alle vragen in deze kamer beantwoord');
            }
        }
        else {
            alert('Verkeerd Antwoord');
            this.activeRoom.hideQuestion();
            this.activeQuestion = undefined;
        }
    }
    getCursorPosition(x, y, type) {
        if (this.activeRoom != null && this.activeQuestion === undefined) {
            let question = this.activeRoom.checkClick(x, y, type);
            if (question != null) {
                this.activeQuestion = question;
            }
        }
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx, this.canvas.width, this.canvas.height);
        this.player.draw(ctx);
        if (this.activeRoom != undefined) {
            this.activeRoom.clickableItems.forEach(obj => {
                ctx.beginPath();
                ctx.rect(obj.minX, obj.minY, 5, 5);
                ctx.rect(obj.maxX, obj.maxY, 5, 5);
                ctx.stroke();
            });
        }
    }
    doorAndLobbyDetection(list) {
        let playerX = this.player.x + (this.player.baseImg.width / 2);
        let playerY = this.player.y + (this.player.baseImg.height / 2);
        list.forEach((obj) => {
            if (playerX > obj.minX && playerX < obj.maxX && playerY > obj.minY && playerY < obj.maxY) {
                switch (obj.name) {
                    case 'lobby':
                        switch (obj.img) {
                            case '1':
                                if (this.getImgName(this.view.img).includes('2')) {
                                    this.player.x = this.player.baseImg.width - (this.player.baseImg.width / 2);
                                    this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`));
                                    this.player.lobby = this.getImgName(this.view.img);
                                }
                                break;
                            case '2':
                                if (this.getImgName(this.view.img).includes('1')) {
                                    this.player.x = this.canvas.width - (this.player.baseImg.width * 1.1);
                                    this.view = new View(Game.loadNewImage(`assets/img/backgrounds/hallway${obj.img}.png`));
                                    this.player.lobby = this.getImgName(this.view.img);
                                }
                                break;
                        }
                        break;
                    case 'door':
                        if (this.player.keyListener.isKeyDown(13)) {
                            this.rooms.forEach(room => {
                                if (this.getImgName(room.img) === `${obj.img}.jpg`) {
                                    this.view = room;
                                    this.activeRoom = room;
                                    this.player.inRoom = true;
                                }
                            });
                        }
                        break;
                }
            }
        });
    }
    returnToLobby() {
        if (this.player.keyListener.isKeyDown(27) && this.activeQuestion === undefined) {
            this.view = new View(Game.loadNewImage(`assets/img/backgrounds/${this.player.lobby}`));
            this.activeRoom = null;
            this.player.inRoom = false;
        }
    }
    static writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 30, color = "black", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static removeItem(list, obj) {
        list.slice(list.indexOf(obj), 1);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    getImgName(img) {
        let fullPath = img.src;
        return fullPath.replace(/^.*[\\\/]/, '');
    }
    createRooms() {
        let basic1 = new RoomBasic303(Game.loadNewImage('assets/img/rooms/room3.jpg'), this.canvas.width, this.canvas.height);
        let basic2 = new RoomSky403(Game.loadNewImage('assets/img/rooms/room7.jpg'), this.canvas.width, this.canvas.height);
        let bath = new RoomBath401(Game.loadNewImage('assets/img/rooms/room4.jpg'), this.canvas.width, this.canvas.height);
        let beach = new RoomBeach402(Game.loadNewImage('assets/img/rooms/room6.jpg'), this.canvas.width, this.canvas.height);
        let chinese = new RoomChinese400(Game.loadNewImage('assets/img/rooms/room5.jpg'), this.canvas.width, this.canvas.height);
        let future = new RoomFuture301(Game.loadNewImage('assets/img/rooms/room1.jpg'), this.canvas.width, this.canvas.height);
        let penthouse = new RoomPenthouse302(Game.loadNewImage('assets/img/rooms/room2.jpg'), this.canvas.width, this.canvas.height);
        this.rooms.push(basic1, basic2, bath, beach, chinese, future, penthouse);
    }
    fillLists() {
        this.lobbies = [
            {
                name: 'lobby',
                minX: 0,
                minY: 0,
                maxX: this.player.baseImg.width / 2,
                maxY: this.canvas.height,
                img: '2'
            },
            {
                name: 'lobby',
                minX: this.canvas.width - (this.player.baseImg.width / 2),
                minY: 0,
                maxX: this.canvas.width,
                maxY: this.canvas.height,
                img: '1'
            }
        ];
        this.doorLocationsLobby1 = [
            {
                name: 'door',
                minX: this.canvas.width / 35,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 6,
                maxY: this.canvas.height / 1.1,
                img: 'room1'
            },
            {
                name: 'door',
                minX: this.canvas.width / 3.4,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 2.25,
                maxY: this.canvas.height / 1.1,
                img: 'room2'
            },
            {
                name: 'door',
                minX: this.canvas.width / 1.85,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.45,
                maxY: this.canvas.height / 1.1,
                img: 'room3'
            },
            {
                name: 'door',
                minX: this.canvas.width / 6,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 3.2,
                maxY: this.canvas.height / 2,
                img: 'room4'
            },
            {
                name: 'door',
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.76,
                maxY: this.canvas.height / 2,
                img: 'room5'
            },
        ];
        this.doorLocationsLobby2 = [
            {
                name: 'door',
                minX: this.canvas.width / 1.45,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.2,
                maxY: this.canvas.height / 2,
                img: 'room6'
            },
            {
                name: 'door',
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 5,
                maxX: this.canvas.width / 1.76,
                maxY: this.canvas.height / 2,
                img: 'room7'
            },
            {
                name: 'vault',
                minX: this.canvas.width / 1.7,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.3,
                maxY: this.canvas.height / 1.1,
                img: 'room6'
            },
            {
                name: 'keypad',
                minX: this.canvas.width / 2.05,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 1.85,
                maxY: this.canvas.height / 1.1,
                img: 'room6'
            },
        ];
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_D = 68;
KeyListener.KEY_S = 83;
KeyListener.KEY_W = 87;
class Player {
    constructor(name, characterName, img, canvasWidth, canvasHeight, lobby) {
        this._baseImg = Game.loadNewImage(`assets/img/players/charaback.png`);
        this.speed = 10;
        this._inRoom = false;
        this._lastWalkImg = 1;
        this._playerName = name;
        this._characterName = characterName;
        this._img = img;
        this._x = canvasWidth / 2;
        this._y = canvasHeight - 240;
        this.keyListener = new KeyListener;
        this._lobby = lobby;
    }
    update(canvasWidth, canvasHeight) {
        this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}back.png`);
        this.move(canvasWidth, canvasHeight);
    }
    move(canvasWidth, canvasHeight) {
        let floorDivider = canvasHeight / 2.07;
        let feetLocation = this.y + this.img.height;
        if (this.inRoom === false) {
            if (this.keyListener.isKeyDown(65)) {
                if (this.x >= 0) {
                    this.x -= this.speed;
                }
                this.walk('left');
            }
            if (this.keyListener.isKeyDown(68)) {
                if (canvasWidth >= this.x + this._img.width) {
                    this.x += this.speed;
                }
                this.walk('right');
            }
            if (this.keyListener.isKeyDown(87)) {
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.x > canvasWidth / 1.15 && this.x < canvasWidth && this.y > floorDivider) {
                            this._x = canvasWidth / 1.15 - (this.img.width * 2);
                            this._y = canvasHeight / 2.07 - this.img.height;
                        }
                        break;
                    case 'hallway2.png':
                        if (this.x > 0 && this.x < canvasWidth / 8 && this.y > floorDivider) {
                            this._x = canvasWidth / 4.5 - this.img.width;
                            this._y = canvasHeight / 2.07 - this.img.height;
                        }
                        break;
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}back.png`);
            }
            if (this.keyListener.isKeyDown(83)) {
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.x > canvasWidth / 1.3 && this.x < canvasWidth / 1.15 && this.y < floorDivider) {
                            this._x = canvasWidth / 1.1;
                            this._y = canvasHeight - this.img.height;
                        }
                        break;
                    case 'hallway2.png':
                        if (this.x > canvasWidth / 8 && this.x < canvasWidth / 4.5 && this.y < floorDivider) {
                            this._x = canvasWidth / 8 - (this.img.width * 2);
                            this._y = canvasHeight - this.img.height;
                        }
                        break;
                }
                this.img = Game.loadNewImage(`assets/img/players/char${this.playerName}front.png`);
            }
            this.applySimpleGravity(canvasHeight, feetLocation, floorDivider);
        }
    }
    walk(direction) {
        let walkNum = this.walkNumCalculation();
        switch (direction) {
            case 'right':
                this.img = Game.loadNewImage(`assets/img/players/walkcycle${this.playerName}/right/char${this.playerName}${walkNum}right.png`);
                break;
            case 'left':
                this.img = Game.loadNewImage(`assets/img/players/walkcycle${this.playerName}/left/char${this.playerName}${walkNum}left.png`);
                break;
        }
        this.lastWalkImg++;
    }
    applySimpleGravity(canvasHeight, feetLocation, floorDivider) {
        if (feetLocation > floorDivider + 5 && feetLocation < canvasHeight) {
            this.y += 2;
        }
        if (feetLocation < floorDivider && feetLocation < floorDivider - 5) {
            this.y += 2;
        }
    }
    draw(ctx) {
        if (this._inRoom === false) {
            ctx.drawImage(this._img, this._x, this._y);
        }
    }
    walkNumCalculation() {
        if (this.lastWalkImg >= 120) {
            this.lastWalkImg = 0;
        }
        if (this.lastWalkImg < 15) {
            return 10;
        }
        else if (this.lastWalkImg > 15 && this.lastWalkImg < 30) {
            return 20;
        }
        else if (this.lastWalkImg > 30 && this.lastWalkImg < 45) {
            return 30;
        }
        else if (this.lastWalkImg > 45 && this.lastWalkImg < 60) {
            return 40;
        }
        else if (this.lastWalkImg > 60 && this.lastWalkImg < 75) {
            return 50;
        }
        else if (this.lastWalkImg > 75 && this.lastWalkImg < 90) {
            return 60;
        }
        else if (this.lastWalkImg > 90 && this.lastWalkImg < 105) {
            return 70;
        }
        else if (this.lastWalkImg > 105 && this.lastWalkImg < 120) {
            return 80;
        }
        return null;
    }
    get lastWalkImg() {
        return this._lastWalkImg;
    }
    set lastWalkImg(value) {
        this._lastWalkImg = value;
    }
    get playerName() {
        return this._playerName;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    get img() {
        return this._img;
    }
    set img(value) {
        this._img = value;
    }
    get characterName() {
        return this._characterName;
    }
    set characterName(value) {
        this._characterName = value;
    }
    get inRoom() {
        return this._inRoom;
    }
    set inRoom(value) {
        this._inRoom = value;
    }
    get lobby() {
        return this._lobby;
    }
    set lobby(value) {
        this._lobby = value;
    }
    get baseImg() {
        return this._baseImg;
    }
}
class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
}
class Question {
    constructor(question, goodAnswer, badAnswer1, badAnswer2, badAnswer3, extraInfo, img) {
        this._badAnswer1 = badAnswer1;
        this._badAnswer2 = badAnswer2;
        this._badAnswer3 = badAnswer3;
        this._goodAnswer = goodAnswer;
        this._extraInfo = extraInfo;
        this._question = question;
        this._img = img;
    }
    get question() {
        return this._question;
    }
    get extraInfo() {
        return this._extraInfo;
    }
    get img() {
        return this._img;
    }
    get goodAnswer() {
        return this._goodAnswer;
    }
    get badAnswer1() {
        return this._badAnswer1;
    }
    get badAnswer2() {
        return this._badAnswer2;
    }
    get badAnswer3() {
        return this._badAnswer3;
    }
}
class Size {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
}
class Rectangle {
    constructor(x, y, w, h) {
        this._point = new Point(x, y);
        this._size = new Size(w, h);
    }
    get point() {
        return this._point;
    }
    set point(value) {
        this._point = value;
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
}
class View {
    constructor(img) {
        this._img = img;
    }
    draw(ctx, cWidth, cHeight) {
        ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, cWidth, cHeight);
    }
    get img() {
        return this._img;
    }
}
class Room extends View {
    constructor(room, questions, clickableItems) {
        super(room);
        this._questions = questions;
        this._clickableItems = clickableItems;
    }
    ;
    checkClick(x, y, type) {
        let question;
        if (type === 'hover') {
            document.getElementById('canvas').style.cursor = 'default';
        }
        this._clickableItems.forEach(obj => {
            if ((x >= obj.minX) && (x <= obj.maxX) && (y >= obj.minY) && (y <= obj.maxY)) {
                switch (type) {
                    case 'click':
                        this._lastClickedObj = obj;
                        question = this._questions[Math.floor(Math.random() * this._questions.length)];
                        this.showQuestion();
                        document.getElementById("questionText").innerHTML = question.question;
                        this.hideExtraAnswerAndImg();
                        if (this.getRndInteger(1, 3) === 1) {
                            document.getElementById("awnser1").innerHTML = question.badAnswer1;
                            document.getElementById("awnser2").innerHTML = question.goodAnswer;
                        }
                        else {
                            document.getElementById("awnser2").innerHTML = question.badAnswer1;
                            document.getElementById("awnser1").innerHTML = question.goodAnswer;
                        }
                        if (question.badAnswer2 || question.badAnswer3 != undefined) {
                            document.getElementById("awnser3").innerHTML = question.badAnswer2;
                            document.getElementById("awnser4").innerHTML = question.badAnswer3;
                            document.getElementById('awnser3').classList.remove('hidden');
                            document.getElementById('awnser3').classList.add('visible');
                            document.getElementById('awnser4').classList.remove('hidden');
                            document.getElementById('awnser4').classList.add('visible');
                        }
                        document.getElementById("hintText").innerHTML = question.extraInfo;
                        if (question.img != undefined) {
                            document.getElementById("questionImg").classList.add('visible');
                            document.getElementById("questionImg").classList.remove('hidden');
                            document.getElementById("questionImg").src = question.img.src;
                        }
                        break;
                    case 'hover':
                        document.getElementById('canvas').style.cursor = 'zoom-in';
                        break;
                }
            }
        });
        return question;
    }
    hideExtraAnswerAndImg() {
        document.getElementById("questionImg").classList.remove('visible');
        document.getElementById("questionImg").classList.add('hidden');
        document.getElementById('awnser3').classList.add('hidden');
        document.getElementById('awnser3').classList.remove('visible');
        document.getElementById('awnser4').classList.add('hidden');
        document.getElementById('awnser4').classList.remove('visible');
    }
    showQuestion() {
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
    hideQuestion() {
        document.getElementById("canvas").classList.remove("hidden");
        document.getElementById("canvas").classList.add("visible");
        document.getElementById("canvas").classList.add("block");
        document.getElementById("question").classList.add("hidden");
        document.getElementById("question").classList.remove("visible");
    }
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    get questions() {
        return this._questions;
    }
    set questions(value) {
        this._questions = value;
    }
    get clickableItems() {
        return this._clickableItems;
    }
    set clickableItems(value) {
        this._clickableItems = value;
    }
    get lastClickedObj() {
        return this._lastClickedObj;
    }
    set lastClickedObj(value) {
        this._lastClickedObj = value;
    }
}
class RoomBasic303 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')), new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 6.7,
            minY: canvasHeight / 1.56,
            maxX: canvasWidth / 4.22,
            maxY: canvasHeight / 1.44,
        }, {
            name: 'question',
            minX: canvasWidth / 2.52,
            minY: canvasHeight / 2.08,
            maxX: canvasWidth / 0.48,
            maxY: canvasHeight / 1.77,
        });
        super(room, questions, clickableItems);
    }
}
class RoomBath401 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Waarom maken mensen nepnieuws?', 'Ze willen er geld mee verdienen', 'Ze willen aandacht mee krijgen', 'Ze vinden het grappig om te doen', 'Ze willen dat mensen erin trappen', 'Bedenk wat er gebeurd als je klikt en gaat kijken naar nepnieuws', undefined), new Question('Hackers hebben altijd slechte bedoelingen?', 'Niet waar', 'Waar', undefined, undefined, 'Bedenk waar je hackers ook nog voor kan gebruiken in een bedrijf', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 5,
            minY: canvasHeight / 5,
            maxX: canvasWidth / 3,
            maxY: canvasHeight / 3,
        }, {
            name: 'question',
            minX: canvasWidth / 1.12,
            minY: canvasHeight / 1.4,
            maxX: canvasWidth / 1.06,
            maxY: canvasHeight / 1.31,
        });
        super(room, questions, clickableItems);
    }
}
class RoomBeach402 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')), new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 35,
            minY: canvasHeight / 1.7,
            maxX: canvasWidth / 6,
            maxY: canvasHeight / 1.1,
        }, {
            name: 'question',
            minX: canvasWidth / 3.4,
            minY: canvasHeight / 1.7,
            maxX: canvasWidth / 2.25,
            maxY: canvasHeight / 1.1,
        });
        super(room, questions, clickableItems);
    }
}
class RoomChinese400 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Verdienen youtubers veel geld met het maken van filmpjes?', 'ja', 'nee', undefined, undefined, 'per 1000 views kan je tussen de 30 cent en 4 euro verdienen', Game.loadNewImage('assets/img/questionImages/youtube.png')), new Question('Wat mag je sinds 1 juli 2019 niet meer doen op de fiets?', 'Je telefoon gebruiken', 'Zonder handen fietsen', 'Bellen met je fietsbel', 'Iemand meenemen op je bagagedrager', 'Wat mag je ook niet doen achter het stuur in de auto?', Game.loadNewImage('assets/img/questionImages/fietsen.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 2.3,
            minY: canvasHeight / 2.35,
            maxX: canvasWidth / 1.83,
            maxY: canvasHeight / 1.78,
        }, {
            name: 'question',
            minX: canvasWidth / 1.12,
            minY: canvasHeight / 1.4,
            maxX: canvasWidth / 1.06,
            maxY: canvasHeight / 1.31,
        });
        super(room, questions, clickableItems);
    }
}
class RoomFuture301 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')), new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 4.4,
            minY: canvasHeight / 1.36,
            maxX: canvasWidth / 3.77,
            maxY: canvasHeight / 1.51,
        }, {
            name: 'question',
            minX: canvasWidth / 1.49,
            minY: canvasHeight / 2.15,
            maxX: canvasWidth / 1.32,
            maxY: canvasHeight / 1.66,
        });
        super(room, questions, clickableItems);
    }
}
class RoomPenthouse302 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Is deze man echt of nep?', 'Echt hij is echt helemaal echt', 'hij is zoizo 100% Nep', 'dit is een deepfake', 'wie is dit?', 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')), new Question('Is deze man echt of nep?', 'Echt hij is echt helemaal echt', 'hij is zoizo 100% Nep', 'dit is een deepfake', 'wie is dit?', 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 3.18,
            minY: canvasHeight / 1.25,
            maxX: canvasWidth / 2.8,
            maxY: canvasHeight / 1.17,
        }, {
            name: 'question',
            minX: canvasWidth / 1.12,
            minY: canvasHeight / 1.4,
            maxX: canvasWidth / 1.06,
            maxY: canvasHeight / 1.31,
        });
        super(room, questions, clickableItems);
    }
}
class RoomSky403 extends Room {
    constructor(room, canvasWidth, canvasHeight) {
        let questions = [];
        questions.push(new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')), new Question('Is deze man echt of nep?', 'Echt', 'Nep', undefined, undefined, 'Donald Trump was de president van amerika', Game.loadNewImage('assets/img/questionImages/trump.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 35,
            minY: canvasHeight / 1.7,
            maxX: canvasWidth / 6,
            maxY: canvasHeight / 1.1,
        }, {
            name: 'question',
            minX: canvasWidth / 3.4,
            minY: canvasHeight / 1.7,
            maxX: canvasWidth / 2.25,
            maxY: canvasHeight / 1.1,
        });
        super(room, questions, clickableItems);
    }
}
console.log("Javascript is working!");
document.getElementById("canvas").classList.add("hidden");
let myStartButton = document.getElementById("startButton");
let game;
const male = document.getElementById('male');
const female = document.getElementById('female');
document.getElementById('male').addEventListener('click', () => {
    male.style.borderColor = 'lightblue';
    female.style.borderColor = '';
});
document.getElementById('female').addEventListener('click', () => {
    female.style.borderColor = 'lightblue';
    male.style.borderColor = '';
});
document.getElementById('awnser1').addEventListener('click', () => {
    game.checkAnswer('1', document.getElementById('awnser1').innerHTML);
});
document.getElementById('awnser2').addEventListener('click', () => {
    game.checkAnswer('2', document.getElementById('awnser2').innerHTML);
});
document.getElementById('awnser3').addEventListener('click', () => {
    game.checkAnswer('3', document.getElementById('awnser3').innerHTML);
});
document.getElementById('awnser4').addEventListener('click', () => {
    game.checkAnswer('4', document.getElementById('awnser4').innerHTML);
});
myStartButton.addEventListener('click', () => {
    if (male.style.borderColor === 'lightblue') {
        startGame('a', 'frank');
    }
    else if (female.style.borderColor === 'lightblue') {
        startGame('b', 'fredientje');
    }
    else {
        alert('Selecteer een karakter');
    }
});
function startGame(char, name) {
    console.log("starting game!");
    document.getElementById("canvas").classList.remove("hidden");
    document.getElementById("canvas").classList.add("block");
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("visible");
    game = new Game(document.getElementById('canvas'), char, name, window.innerHeight, window.innerWidth);
}
function getMousePosition(canvas, event, type) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    game.getCursorPosition(x, y, type);
}
let canvasElem = document.querySelector("canvas");
canvasElem.addEventListener("mousedown", function (e) {
    getMousePosition(canvasElem, e, 'click');
});
canvasElem.addEventListener("mousemove", function (e) {
    getMousePosition(canvasElem, e, 'hover');
});
//# sourceMappingURL=app.js.map