// tests go here; this will not be compiled when this package is used as an extension.
input.onButtonPressed(Button.A, function () {
    totemBoard.beep(20000, 100)
})
input.onButtonPressed(Button.B, function () {
    totemBoard.stopBeep()
})
let blue = 0
let red = 0
while (true) {
    if (totemBoard.leftTouch()) {
        red = totemBoard.leftTouchValue()
        totemBoard.setLed(0, red, 0, blue)
    } else if (totemBoard.rightTouch()) {
        blue = totemBoard.rightTouchValue()
        totemBoard.setLed(0, red, 0, blue)
    } else {

    }
}
