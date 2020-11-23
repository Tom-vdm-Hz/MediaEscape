class FallingObj {
    constructor(image, canvas, type) {
        this._image = image;
        this._x = this.randomInteger(0, canvas.width - this.image.width);
        this._y = this.image.height;
        this._speed = this.randomInteger(2, 5);
        this._type = type;
    }
    move() {
        this._y += this._speed;
    }
    playerCollision(canvas, player) {
        return player.x < this._x + this._image.width
            && player.x + player.image.width > this._x
            && canvas.height - 100 < this._y + this._image.height
            && canvas.height - 100 + player.image.height > this._y;
    }
    offCanvas(canvas) {
        return this._y + this._image.height > canvas.height;
    }
    draw(ctx) {
        ctx.drawImage(this._image, this._x, this._y);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get type() {
        return this._type;
    }
}
class Game {
    constructor(canvas) {
        this.fallingObjects = [];
        this.frame = 0;
        this.newLife = 500;
        this.lvlUp = 20;
        this.step = () => {
            this.player.move(this.canvas);
            this.fallingObjects.forEach((fallingObj) => {
                fallingObj.move();
            });
            this.render();
            this.checkBoosts();
            this.checkCollisions();
            if (this.player.lives === 0) {
                this.gameOver();
            }
            else {
                this.frame += 1;
                requestAnimationFrame(this.step);
            }
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 2;
        this.canvas.height = window.innerHeight;
        this.createFallingObj('trophy');
        this.createPlayer();
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    checkBoosts() {
        if (this.player.score === this.lvlUp) {
            this.createFallingObj('trophy');
            this.createFallingObj('speedBoost');
            this.lvlUp += 20;
        }
        if (this.frame === this.newLife) {
            this.createFallingObj('extraLife');
            this.newLife += 500;
        }
    }
    checkCollisions() {
        this.fallingObjects.forEach((fallingObj) => {
            switch (fallingObj.type) {
                case 'extraLife':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.lives += 1;
                        this.removeFallingObj(fallingObj);
                    }
                    break;
                case 'speedBoost':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.speed += 1;
                        this.removeFallingObj(fallingObj);
                    }
                    break;
                case 'trophy':
                    if (fallingObj.playerCollision(this.canvas, this.player) === true) {
                        this.player.score += 1;
                        this.removeFallingObj(fallingObj);
                        this.createFallingObj('trophy');
                    }
                    break;
            }
            if (fallingObj.offCanvas(this.canvas) == true) {
                if (fallingObj.type === 'trophy') {
                    this.player.lives -= 1;
                    this.createFallingObj('trophy');
                }
                this.removeFallingObj(fallingObj);
            }
        });
    }
    createFallingObj(type) {
        let fallingObj;
        let img;
        switch (type) {
            case 'speedBoost':
                img = Game.loadNewImage("assets/img/objects/face_on_blue_power_icon.png");
                fallingObj = new FallingObj(img, this.canvas, 'speedBoost');
                break;
            case 'extraLife':
                img = Game.loadNewImage("assets/img/objects/face_on_heart.png");
                fallingObj = new FallingObj(img, this.canvas, 'extraLife');
                break;
            case 'trophy':
                img = Game.loadNewImage("assets/img/objects/gold_trophy.png");
                fallingObj = new FallingObj(img, this.canvas, 'trophy');
                break;
        }
        this.fallingObjects.push(fallingObj);
    }
    createPlayer() {
        let img = Game.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.player = new PLayer(img, (this.canvas.width / 2) - img.width, this.canvas.height - img.height, 4, 5);
    }
    removeFallingObj(fallingObj) {
        this.fallingObjects.splice(this.fallingObjects.indexOf(fallingObj), 1);
    }
    gameOver() {
        document.getElementById('tudo').classList.remove('hidden');
        document.getElementById('score').innerHTML = `${this.player.score}`;
        document.getElementById('canvas').classList.add('hidden');
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(ctx, this.canvas);
        this.fallingObjects.forEach((trophy) => {
            trophy.draw(ctx);
        });
        this.writeTextToCanvas(ctx, "Use Arrow keys to move", 100, 40, 14);
        this.writeTextToCanvas(ctx, `SCORE: ${this.player.score}`, this.canvas.width - 50, 40, 14);
        this.writeTextToCanvas(ctx, `LIVES: ${this.player.lives}`, this.canvas.width - 50, 80, 14);
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
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
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
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class PLayer {
    constructor(image, x, y, speed, lives) {
        this._score = 0;
        this._image = image;
        this._x = x;
        this._y = y;
        this._speed = speed;
        this._lives = lives;
        this._keyListener = new KeyListener();
    }
    move(canvas) {
        if (this._keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            if (this._x >= (this.image.width - (this.image.width / 2))) {
                this._x -= this._speed;
            }
        }
        if (this._keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            if (this._x <= (canvas.width - this._image.width + (this.image.width / 2))) {
                this._x += this._speed;
            }
        }
    }
    draw(ctx, canvas) {
        ctx.drawImage(this.image, this.x - this.image.width / 2, canvas.height - 150);
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get score() {
        return this._score;
    }
    set score(value) {
        this._score = value;
    }
    get lives() {
        return this._lives;
    }
    set lives(value) {
        this._lives = value;
    }
    set speed(value) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
document.getElementById('yes').addEventListener('click', () => {
    location.reload();
});
document.getElementById('no').addEventListener('click', () => {
    alert('Not allowed to close window due to security reasons');
});
//# sourceMappingURL=app.js.map