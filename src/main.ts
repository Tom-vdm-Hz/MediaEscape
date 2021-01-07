console.log("Javascript is working!");
document.getElementById("canvas").classList.add("hidden");
let myStartButton = document.getElementById("startButton");
let game: Game;
const male = document.getElementById('male')
const female = document.getElementById('female')

// Add EventListener to load the game whenever the browser is ready

document.getElementById('male').addEventListener('click', () => {
    male.style.borderColor = 'lightblue'
    female.style.borderColor = ''
})

document.getElementById('female').addEventListener('click', () => {
    female.style.borderColor = 'lightblue'
    male.style.borderColor = ''
})

myStartButton.addEventListener('click', () => {
    if (male.style.borderColor === 'lightblue') {
        startGame('a', 'frank')
    } else if (female.style.borderColor === 'lightblue') {
        startGame('b', 'fredientje')
    } else {
        alert('Selecteer een karakter')
    }
});

function startGame(char: string, name: string) {
    console.log("starting game!");
    document.getElementById("canvas").classList.remove("hidden");
    document.getElementById("canvas").classList.add("block");
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("visible");
    game = new Game(document.getElementById('canvas'), char, name, window.innerHeight, window.innerWidth);
}

function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent, type: string) {
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

