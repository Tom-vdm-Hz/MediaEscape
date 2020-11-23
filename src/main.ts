console.log("Javascript is working!");

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', () => {
    console.log("Handling the Load event");

    const game = new Game(document.getElementById('canvas'));
});

document.getElementById('yes').addEventListener('click', () => {
    location.reload()
})

document.getElementById('no').addEventListener('click', () => {
    alert('Not allowed to close window due to security reasons')
})



