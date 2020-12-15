<<<<<<< HEAD
class Game {
    constructor(canvas, playerName, characterName) {
        this.step = () => {
            this.update();
            this.render();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.view = new View(Game.loadNewImage('assets/img/views/hotelLobby.png'));
        this.player = new Player(playerName, characterName, Game.loadNewImage(`assets/img/players/${characterName}back.png`), this.canvas.width, this.canvas.height);
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    update() {
        this.player.update(this.canvas.width, this.canvas.height);
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx);
        this.player.draw(ctx);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
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
    constructor(name, charachterName, img, canvasWidth, canvasHeight) {
        this.speed = 3;
        this._playerName = name;
        this._characterName = charachterName;
        this._img = img;
        this._x = (canvasWidth / 2) - this._img.width / 2;
        this._y = canvasHeight - img.height;
        this.keyListener = new KeyListener;
    }
    update(canvasWidth, canvasHeight) {
        this.img = Game.loadNewImage(`assets/img/players/${this.playerName}back.png`);
        this.move(canvasWidth, canvasHeight);
    }
    move(canvasWidth, canvasHeight) {
        if (this.keyListener.isKeyDown(65)) {
            console.log('left');
            if (this.x >= 0) {
                this.x -= this.speed;
                this.img = Game.loadNewImage(`assets/img/players/${this.playerName}left.png`);
            }
        }
        if (this.keyListener.isKeyDown(87)) {
            console.log('up');
            if (this.y >= 0) {
                this.y -= this.speed;
                this.img = Game.loadNewImage(`assets/img/players/${this.playerName}back.png`);
            }
        }
        if (this.keyListener.isKeyDown(68)) {
            console.log('right');
            if (canvasWidth >= this.x + this._img.width) {
                this.x += this.speed;
                this.img = Game.loadNewImage(`assets/img/players/${this.playerName}right.png`);
            }
        }
        if (this.keyListener.isKeyDown(83)) {
            console.log('down');
            if (canvasHeight >= this.y + this._img.height) {
                this.y += this.speed;
                this.img = Game.loadNewImage(`assets/img/players/${this.playerName}front.png`);
            }
        }
    }
    draw(ctx) {
        ctx.drawImage(this._img, this._x, this._y);
    }
    get playerName() {
        return this._playerName;
    }
    set playerName(value) {
        this._playerName = value;
    }
    get collectedCodes() {
        return this._collectedCodes;
    }
    set collectedCodes(value) {
        this._collectedCodes = value;
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
}
class View {
    constructor(img) {
        this.img = img;
    }
    draw(ctx) {
        ctx.drawImage(this.img, 0, 0);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'), 'a', 'b');
});
=======
class Game {
    constructor(canvas) {
        this.step = () => {
            this.update();
            this.render();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 2;
        this.canvas.height = window.innerHeight;
        this.view = new View(Game.loadNewImage('assets/img/players/test.png'));
        this.player = new Player('jan', Game.loadNewImage('assets/img/players/test.png'), this.canvas.width, this.canvas.height);
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    update() {
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.view.draw(ctx);
        this.player.draw(ctx);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
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
    constructor(name, img, canvasWidth, canvasHeight) {
        this.name = name;
        this.img = img;
        this.x = (canvasWidth / 2) + this.img.width / 2;
        this.y = canvasHeight - img.height;
        this.keyListener = new KeyListener;
    }
    move() {
        if (this.keyListener.isKeyDown(37) == true) {
            console.log('left');
        }
        if (this.keyListener.isKeyDown(38) == true) {
            console.log('up');
        }
        if (this.keyListener.isKeyDown(39) == true) {
            console.log('right');
        }
        if (this.keyListener.isKeyDown(40) == true) {
            console.log('down');
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y);
    }
}
class View {
    constructor(img) {
        this.img = img;
    }
    draw(ctx) {
        ctx.drawImage(this.img, 0, 0);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
>>>>>>> als-basischoolleerling-wil-ik-door-de-gangen-van-het-hotel-kunnen-lopen-om-naar-hotelkamers-te-navigeren
//# sourceMappingURL=app.js.map