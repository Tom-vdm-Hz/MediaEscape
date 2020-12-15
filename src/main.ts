console.log("Javascript is working!");
document.getElementById("canvas").classList.add("hidden");
let myStartButton = document.getElementById("startButton");

// Add EventListener to load the game whenever the browser is ready
myStartButton.addEventListener('click', () => {
    console.log("starting game!");
    document.getElementById("canvas").classList.remove("hidden");
    document.getElementById("canvas").classList.add("visible");
    const game = new Game(document.getElementById('canvas'));
});
