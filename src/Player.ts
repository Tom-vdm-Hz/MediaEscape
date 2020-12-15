class Player {
    private name: string
    private collectedCodes: number[]
    private keyListener: KeyListener

    public constructor() {
        this.keyListener = new KeyListener

        
    }

    public move() {
        //left key is pressed
        if (this.keyListener.isKeyDown(37) == true) {
            console.log('left')
        }
        //up key is pressed
        if (this.keyListener.isKeyDown(38) == true) {
            console.log('up')
        }
        //right key is pressed
        if (this.keyListener.isKeyDown(39) == true) {
            console.log('right')
        }
        //down key is pressed
        if (this.keyListener.isKeyDown(40) == true) {
            console.log('down')
        }
    }
}
