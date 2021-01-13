/**
 * This class handles the keyboard events. It knows the last known state of its
 * keys
 *
 * Some parts of this class are pretty complex, but the class itself is fairly
 * easy to use. You just instantiate one object in your game and us the method
 * `isKeyDown()` to check if a specific key is currently pressed down by the
 * user.
 *
 * It is also possible to check whether a key is typed in the previous frame.
 * A key is typed when it was down for at least one frame time and the
 * released. In order to make this work, the `onFrameStart()` method must be
 * called at each animationFrame.
 *
 * @author BugSlayer
 */
class KeyListener {

    // Some convenient key codes already defined here. If you need a specific
    // keycode, see:https://keycode.info/
    public static readonly KEY_ENTER = 13;
    public static readonly KEY_ESC = 27;
    public static readonly KEY_SPACE = 32;
    public static readonly KEY_LEFT = 37;
    public static readonly KEY_UP = 38;
    public static readonly KEY_RIGHT = 39;
    public static readonly KEY_DOWN = 40;

    public static readonly KEY_1 = 49;
    public static readonly KEY_2 = 50;
    public static readonly KEY_3 = 51;
    public static readonly KEY_4 = 52;
    public static readonly KEY_5 = 53;
    public static readonly KEY_6 = 54;
    public static readonly KEY_7 = 55;
    public static readonly KEY_8 = 56;
    public static readonly KEY_9 = 57;
    public static readonly KEY_0 = 58;

    public static readonly KEY_A = 65;
    public static readonly KEY_D = 68;
    public static readonly KEY_S = 83;
    public static readonly KEY_W = 87;

    /**
     * Array that holds a boolean for each keycode. The keycode is the index of
     * the array and the boolean is the state of that key (`true` means that
     * the key is down).
     */
    private keyCodeStates: boolean[] = new Array<boolean>();
    private keyDownOnceSwitch: boolean = false

    constructor() {

        window.addEventListener("keydown", (ev: KeyboardEvent) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev: KeyboardEvent) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }

    public isKeyDown(keyCode: number): boolean {
        return this.keyCodeStates[keyCode] == true;
    }

    public keyDownOnce(keyCode: number): boolean {
        if (this.keyCodeStates[keyCode] == true && this.keyDownOnceSwitch != true) {
            this.keyDownOnceSwitch = true
            return true
        } else if (this.keyCodeStates[keyCode] == false) {
            this.keyDownOnceSwitch = false
            return false
        }
        return false
    }


}
