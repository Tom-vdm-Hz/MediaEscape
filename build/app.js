class Code {
    constructor(roomNum) {
        this._roomNum = roomNum;
    }
    get roomNum() {
        return this._roomNum;
    }
    set roomNum(value) {
        this._roomNum = value;
    }
    get codeNum() {
        return this._codeNum;
    }
    set codeNum(value) {
        this._codeNum = value;
    }
}
class Game {
    constructor(canvas, playerName, characterName, windowHeight, windowWidth) {
        this.rooms = [];
        this.vault = new Vault(Game.loadNewImage('assets/img/backgrounds/vault.png'));
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
        this.keypad = new Keypad(Game.loadNewImage('assets/img/backgrounds/keypadzoomin.png'), this.canvas.width, this.canvas.height);
        this.createRooms();
        requestAnimationFrame(this.step);
    }
    update() {
        if (this.listsLoaded != 20) {
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
        if (this.view === this.vault) {
            if (this.player.keyListener.isKeyDown(32)) {
                Game.popup('Goed gedaan', 'Je hebt de kluis geopend en gewonnen');
            }
        }
        if (this.view === this.keypad) {
            if (this.player.keyListener.keyDownOnce(8)) {
                this.keypad.deleteLastNum();
            }
            if (this.player.keyListener.isKeyDown(32)) {
                this.keypad.checkCode(this.player.collectedCodes, this.vault);
            }
        }
        this.doorAndLobbyDetection(this.lobbies);
        this.returnToLobby();
    }
    checkAnswer(button, answer) {
        if (this.activeQuestion.goodAnswer === answer) {
            Game.popup('Goed gedaan', 'Je hebt de vraag goed beantwoord');
            this.activeRoom.hideQuestion();
            this.activeRoom.questions.splice(this.activeRoom.questions.indexOf(this.activeQuestion), 1);
            this.activeRoom.clickableItems.splice(this.activeRoom.clickableItems.indexOf(this.activeRoom.lastClickedObj), 1);
            this.activeQuestion = undefined;
            if (this.activeRoom.questions.length === 0) {
                this.player.collectedCodes.forEach(code => {
                    if (code.roomNum === this.activeRoom.roomNumber) {
                        code.codeNum = Room.getRndInteger(1, 10);
                    }
                });
                Game.popup('Goed gedaan, kamer voltooid', 'alle vragen in deze kamer zijn goed beantwoord, nieuw deel van de code vrijgespeeld, druk op ESC om de kamer te verlaten');
            }
        }
        else {
            Game.popup('Helaas, fout', 'Probeer opnieuw');
            this.activeQuestion.showHint = true;
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
        if (this.view === this.keypad) {
            this.keypad.checkClick(x, y, type);
        }
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx, this.canvas.width, this.canvas.height);
        this.player.draw(ctx);
        if (this.view === this.vault) {
            Game.writeTextToCanvas(ctx, 'Druk op "spatie" om het spel te beindigen', this.canvas.width / 2, this.canvas.height - 40, 40);
        }
        if (this.view === this.keypad) {
            this.keypad.drawCode(ctx, this.canvas.width, this.canvas.height);
            Game.writeTextToCanvas(ctx, 'Druk op "spatie" om de code te controleren', this.canvas.width / 2, this.canvas.height - 40, 40);
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
                                if (this.getImgName(room.img) === `${obj.img}.png`) {
                                    this.view = room;
                                    this.activeRoom = room;
                                    this.player.inRoom = true;
                                }
                            });
                        }
                        break;
                    case 'vault':
                        if (this.player.keyListener.isKeyDown(13)) {
                            if (this.vault.isOpen) {
                                this.view = this.vault;
                                this.player.inRoom = true;
                            }
                            else {
                                Game.popup('Kluis zit nog op slot', 'vul de juiste code in op de keypad om de kluis te openen');
                            }
                        }
                        break;
                    case 'keypad':
                        if (this.player.keyListener.isKeyDown(13)) {
                            this.view = this.keypad;
                            this.player.inRoom = true;
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
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static popup(headerText, bodyText) {
        document.getElementById('popupButton').click();
        document.getElementById('headerText').innerHTML = headerText;
        document.getElementById('bodyText').innerHTML = bodyText;
    }
    getImgName(img) {
        let fullPath = img.src;
        return fullPath.replace(/^.*[\\\/]/, '');
    }
    createRooms() {
        let basic1 = new RoomBasic303(Game.loadNewImage('assets/img/rooms/room3.png'), this.canvas.width, this.canvas.height, 303);
        let basic2 = new RoomSky403(Game.loadNewImage('assets/img/rooms/room7.png'), this.canvas.width, this.canvas.height, 403);
        let bath = new RoomBath401(Game.loadNewImage('assets/img/rooms/room4.png'), this.canvas.width, this.canvas.height, 401);
        let beach = new RoomBeach402(Game.loadNewImage('assets/img/rooms/room6.png'), this.canvas.width, this.canvas.height, 402);
        let chinese = new RoomChinese400(Game.loadNewImage('assets/img/rooms/room5.png'), this.canvas.width, this.canvas.height, 400);
        let future = new RoomFuture301(Game.loadNewImage('assets/img/rooms/room1.png'), this.canvas.width, this.canvas.height, 301);
        let penthouse = new RoomPenthouse302(Game.loadNewImage('assets/img/rooms/room2.png'), this.canvas.width, this.canvas.height, 302);
        this.rooms.push(basic1, basic2, bath, beach, chinese, future, penthouse);
        this.player.collectedCodes.push(new Code(basic1.roomNumber), new Code(basic2.roomNumber), new Code(bath.roomNumber), new Code(beach.roomNumber), new Code(chinese.roomNumber), new Code(future.roomNumber), new Code(penthouse.roomNumber));
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
                minX: this.canvas.width / 2.3,
                minY: this.canvas.height / 1.7,
                maxX: this.canvas.width / 2,
                maxY: this.canvas.height / 1.1,
                img: 'room6'
            },
        ];
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyDownOnceSwitch = false;
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    keyDownOnce(keyCode) {
        if (this.keyCodeStates[keyCode] == true && this.keyDownOnceSwitch != true) {
            this.keyDownOnceSwitch = true;
            return true;
        }
        else if (this.keyCodeStates[keyCode] == false) {
            this.keyDownOnceSwitch = false;
            return false;
        }
        return false;
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
class Keypad extends View {
    constructor(img, canvasWidth, canvasHeight) {
        super(img);
        this.enteredCode = '';
        this._clickableItems = [{
                value: 1,
                minX: canvasWidth / 2.48,
                minY: canvasHeight / 1.54,
                maxX: canvasWidth / 2.1,
                maxY: canvasHeight / 1.4,
            }, {
                value: 2,
                minX: canvasWidth / 2.06,
                minY: canvasHeight / 1.54,
                maxX: canvasWidth / 1.8,
                maxY: canvasHeight / 1.4,
            }, {
                value: 3,
                minX: canvasWidth / 1.78,
                minY: canvasHeight / 1.54,
                maxX: canvasWidth / 1.58,
                maxY: canvasHeight / 1.4,
            }, {
                value: 4,
                minX: canvasWidth / 2.48,
                minY: canvasHeight / 1.73,
                maxX: canvasWidth / 2.1,
                maxY: canvasHeight / 1.55,
            }, {
                value: 5,
                minX: canvasWidth / 2.06,
                minY: canvasHeight / 1.73,
                maxX: canvasWidth / 1.8,
                maxY: canvasHeight / 1.55,
            }, {
                value: 6,
                minX: canvasWidth / 1.78,
                minY: canvasHeight / 1.73,
                maxX: canvasWidth / 1.58,
                maxY: canvasHeight / 1.55,
            }, {
                value: 7,
                minX: canvasWidth / 2.48,
                minY: canvasHeight / 1.97,
                maxX: canvasWidth / 2.1,
                maxY: canvasHeight / 1.75,
            }, {
                value: 8,
                minX: canvasWidth / 2.06,
                minY: canvasHeight / 1.97,
                maxX: canvasWidth / 1.8,
                maxY: canvasHeight / 1.75,
            }, {
                value: 9,
                minX: canvasWidth / 1.78,
                minY: canvasHeight / 1.97,
                maxX: canvasWidth / 1.58,
                maxY: canvasHeight / 1.75,
            },];
    }
    checkCode(playerCode, vault) {
        let playerCodeString = '';
        playerCode.forEach(code => {
            playerCodeString += code.codeNum;
        });
        if (playerCodeString === this.enteredCode) {
            Game.popup('Goed gedaan', 'De kluis is nu open');
            vault.isOpen = true;
        }
        else {
            Game.popup('Verkeerd', 'Probeer opnieuw en controleer of je alle kamers hebt afgemaakt');
        }
    }
    checkClick(x, y, type) {
        this._clickableItems.forEach(obj => {
            if ((x >= obj.minX) && (x <= obj.maxX) && (y >= obj.minY) && (y <= obj.maxY)) {
                if (type === 'click') {
                    if (this.enteredCode.length < 8) {
                        this.enteredCode += JSON.stringify(obj.value);
                    }
                }
            }
        });
    }
    deleteLastNum() {
        this.enteredCode = this.enteredCode.slice(0, -1);
    }
    drawCode(ctx, canvasWidth, canvasHeight) {
        Game.writeTextToCanvas(ctx, this.enteredCode, canvasWidth / 2, canvasHeight / 3, 50, 'white');
    }
    get clickableItems() {
        return this._clickableItems;
    }
}
class Player {
    constructor(name, characterName, img, canvasWidth, canvasHeight, lobby) {
        this._baseImg = Game.loadNewImage(`assets/img/players/charaback.png`);
        this._collectedCodes = [];
        this.speed = 4;
        this._inRoom = false;
        this._lastWalkImg = 1;
        this._playerName = name;
        this._characterName = characterName;
        this._img = img;
        this._x = canvasWidth / 2;
        this._y = canvasHeight / 1.6;
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
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.x >= 0) {
                            this.x -= this.speed;
                        }
                        break;
                    case 'hallway2.png':
                        if (this.y < floorDivider && this.x >= canvasWidth / 8) {
                            this.x -= this.speed;
                        }
                        else if (this.y > floorDivider && this.x >= 0) {
                            this.x -= this.speed;
                        }
                        break;
                }
                this.walk('left');
            }
            if (this.keyListener.isKeyDown(68)) {
                switch (this.lobby) {
                    case 'hallway1.png':
                        if (this.y < floorDivider && canvasWidth / 1.15 >= this.x + this._img.width) {
                            this.x += this.speed;
                        }
                        if (this.y > floorDivider && canvasWidth >= this.x + this._img.width) {
                            this.x += this.speed;
                        }
                        break;
                    case 'hallway2.png':
                        if (canvasWidth >= this.x + this._img.width) {
                            this.x += this.speed;
                        }
                        break;
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
            let h = 35;
            this._collectedCodes.forEach(code => {
                Game.writeTextToCanvas(ctx, JSON.stringify(code.roomNum), 30, h);
                Game.writeTextToCanvas(ctx, '=', 70, h);
                if (code.codeNum != undefined) {
                    Game.writeTextToCanvas(ctx, JSON.stringify(code.codeNum), 95, h);
                }
                h += 35;
            });
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
    get collectedCodes() {
        return this._collectedCodes;
    }
    set collectedCodes(value) {
        this._collectedCodes = value;
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
        this._showHint = false;
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
    get showHint() {
        return this._showHint;
    }
    set showHint(value) {
        this._showHint = value;
    }
}
class Room extends View {
    constructor(room, questions, clickableItems, roomNumber) {
        super(room);
        this._questions = questions;
        this._clickableItems = clickableItems;
        this._roomNumber = roomNumber;
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
                        if (Room.getRndInteger(1, 3) === 1) {
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
                        if (question.showHint) {
                            document.getElementById("hintText").innerHTML = question.extraInfo;
                        }
                        else {
                            document.getElementById("hintText").innerHTML = "Hint is pas beschikbaar als je de vraag 1 keer fout hebt beantwoord.";
                        }
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
    static getRndInteger(min, max) {
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
    get roomNumber() {
        return this._roomNumber;
    }
}
class RoomBasic303 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Is social media een betrouwbare bron?', 'Nee', 'Ja', undefined, undefined, 'Er gaan veel neppe artikels rond via social media.', undefined), new Question('Zijn de bovenste zoekresultaten altijd de beste?', 'Nee, want er wordt voor de plek betaald', 'Ja, want ze staan bovenaan', 'Ja, want ze zijn relevant', 'Nee, het zijn reclames', 'De bovenste resultaten zijn vaak geplaatst met zichtbaarheid in gedachte, in plaats van relevantie.', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 4.1,
            minY: canvasHeight / 2.56,
            maxX: canvasWidth / 3.66,
            maxY: canvasHeight / 2.18,
        }, {
            name: 'question',
            minX: canvasWidth / 2,
            minY: canvasHeight / 6.4,
            maxX: canvasWidth / 1.95,
            maxY: canvasHeight / 5.35,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomBath401 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Waarom maken mensen nepnieuws?', 'Ze willen er geld mee verdienen', 'Ze willen er aandacht mee krijgen', 'Ze vinden het grappig om te doen', 'Ze willen dat mensen erin trappen', 'Bedenk wat er gebeurt als je klikt en gaat kijken naar nepnieuws', undefined), new Question('Hackers hebben altijd slechte bedoelingen', 'Niet waar', 'Waar', undefined, undefined, 'Bedenk waar je hackers ook nog voor kan gebruiken in een bedrijf', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 2.33,
            minY: canvasHeight / 2.6,
            maxX: canvasWidth / 2.2,
            maxY: canvasHeight / 2.1,
        }, {
            name: 'question',
            minX: canvasWidth / 1.23,
            minY: canvasHeight / 1.15,
            maxX: canvasWidth / 1.13,
            maxY: canvasHeight / 1.03,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomBeach402 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Je ziet de volgende advertentie, wat doe je?', 'Je negeert de advertentie', 'Je klikt op de advertentie', 'Je gooit je telefoon weg', 'Je klikt op de advertentie maar verwacht niks', 'Wat doe je als iets je niet intreseert?', Game.loadNewImage('assets/img/questionImages/geldreclame.jpg')), new Question('Je krijgt een rare e-mail van een Arabische prins, wat doe je?', 'Je verwijdert de e-mail', 'Je doet wat de prins zegt', 'Je negeert de e-mail', 'Je reageert op de mail', 'Is dit wel een Arabische prins?', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: 0,
            minY: canvasHeight / 2.2,
            maxX: canvasWidth / 10,
            maxY: canvasHeight / 1.05,
        }, {
            name: 'question',
            minX: canvasWidth / 1.6,
            minY: canvasHeight / 1.2,
            maxX: canvasWidth / 1.5,
            maxY: canvasHeight / 1.1,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomChinese400 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Verdienen youtubers veel geld met het maken van filmpjes?', 'ja', 'nee', undefined, undefined, 'per 1000 views kan je tussen de 30 cent en 4 euro verdienen', Game.loadNewImage('assets/img/questionImages/youtube.png')), new Question('Wat mag je sinds 1 juli 2019 niet meer doen op de fiets?', 'Je telefoon gebruiken', 'Zonder handen fietsen', 'Bellen met je fietsbel', 'Iemand meenemen op je bagagedrager', 'Wat mag je ook niet doen achter het stuur in de auto?', Game.loadNewImage('assets/img/questionImages/fietsen.jpg')));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 12,
            minY: canvasHeight / 1.7,
            maxX: canvasWidth / 9,
            maxY: canvasHeight / 1.5,
        }, {
            name: 'question',
            minX: canvasWidth / 1.5,
            minY: canvasHeight / 1.35,
            maxX: canvasWidth / 1.4,
            maxY: canvasHeight / 1.3,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomFuture301 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Hoe kun je zien of een post betrouwbaar is?', 'De bron is geverifieerd', 'De titel klinkt goed', 'Het leest lekker', 'Het wordt veel gedeeld', 'Bronnen van officiële organisaties zijn het meest betrouwbaar', undefined), new Question('Hoeveel tijd besteden jongeren vanaf 13+ dagelijks aan media?', 'Achtenhalf uur', 'vierenhalf uur', 'tienenhalf uur', 'tweeënhalf uur', 'Het is meer dan je denkt, maar onder de tien', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 1.62,
            minY: canvasHeight / 2.71,
            maxX: canvasWidth / 1.44,
            maxY: canvasHeight / 1.87,
        }, {
            name: 'question',
            minX: canvasWidth / 3.41,
            minY: canvasHeight / 1.85,
            maxX: canvasWidth / 3.27,
            maxY: canvasHeight / 1.78,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomPenthouse302 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Bestaat deze man?', 'dit is een deepfake', 'Hij is Nep', 'Hij bestaat', 'Dit is een willekeurige foto', 'Een deepfake is een foto die is gemaakt door een computer', Game.loadNewImage('assets/img/questionImages/deepfake.jpg')), new Question('Wat is de beste manier voor een wachtwoord?', 'Gebruik bij iedere website een ander wachtwoord', 'Gerbuik altijd hetzelfde wachtwoord', 'Laat iemand anders jouw wachtwoord bedenken', 'Vertel iedereen je wachtwoord', 'Houd je wachtwoord altijd voor jezelf', Game.loadNewImage('assets/img/questionImages/wachtwoord.jpg')));
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
        super(room, questions, clickableItems, roomNumber);
    }
}
class RoomSky403 extends Room {
    constructor(room, canvasWidth, canvasHeight, roomNumber) {
        let questions = [];
        questions.push(new Question('Wat is de gemiddelde leeftijd dat kinderen voor het eerst zelfstandig achter de computer zitten?', '4', '2', '5', '7', 'Ouder dan 2 en jonger dan 7', undefined), new Question('Vanaf welke leeftijd begint de belangstelling van baby’s voor tablets?', 'Tussen de 3 en 5 maanden', 'Tussen de 5 en 7 maanden', 'Tussen de 7 en 10 maanden', 'Tussen de 10 en 12 maanden', 'Het is jonger dan je denkt', undefined));
        let clickableItems = [];
        clickableItems.push({
            name: 'question',
            minX: canvasWidth / 15,
            minY: canvasHeight / 1.2,
            maxX: canvasWidth / 7,
            maxY: canvasHeight / 1.08,
        }, {
            name: 'question',
            minX: canvasWidth / 2,
            minY: canvasHeight / 1.45,
            maxX: canvasWidth / 1.85,
            maxY: canvasHeight / 1.35,
        });
        super(room, questions, clickableItems, roomNumber);
    }
}
class Vault extends View {
    constructor(img) {
        super(img);
        this._isOpen = false;
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
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