console.log("Javascript is working!");
document.getElementById("canvas").classList.add("hidden");
let myStartButton = document.getElementById("startButton");


// Add EventListener to load the game whenever the browser is ready
myStartButton.addEventListener('click', () => {
    console.log("starting game!");
    document.getElementById("canvas").classList.remove("hidden");
    document.getElementById("canvas").classList.add("visible");
    const game = new Game(document.getElementById('canvas'), 'a', 'A', window.innerHeight, window.innerWidth);
});

// @ts-ignore
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    Game.test(x, y)
}

let canvasElem = document.querySelector("canvas");

canvasElem.addEventListener("mousedown", function (e) {
    getMousePosition(canvasElem, e);
});

