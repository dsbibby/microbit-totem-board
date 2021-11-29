function Motor_Down() {
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(5000)
    pins.digitalWritePin(DigitalPin.P13, 0)
}

function Get_Left_Touch_Value() {
    return Get_Touch_Values()[0]
}

function Set_LED(id: number, red: number, green: number, blue: number) {
    let buf2 = control.createBuffer(5)
    buf2.setNumber(NumberFormat.Int8LE, 0, 0)
    buf2.setNumber(NumberFormat.Int8LE, 1, id)
    buf2.setNumber(NumberFormat.Int8LE, 2, red)
    buf2.setNumber(NumberFormat.Int8LE, 3, green)
    buf2.setNumber(NumberFormat.Int8LE, 4, blue)
    pins.i2cWriteBuffer(42, buf2, false)
    basic.pause(150)
}



input.onButtonPressed(Button.B, function on_button_pressed_b() {
    Set_LED(0, 255, 0, 0)

})
function Get_Touch_Values(): Buffer {
    let buf = control.createBuffer(1)
    buf.setNumber(NumberFormat.Int8LE, 0, 5)
    pins.i2cWriteBuffer(42, buf, false)
    basic.pause(150)
    return pins.i2cReadBuffer(42, 2)
}

function Motor_Up() {
    pins.digitalWritePin(DigitalPin.P14, 1)
    basic.pause(5000)
    pins.digitalWritePin(DigitalPin.P14, 0)
}

function Get_Light_level() {
    let buf3 = control.createBuffer(1)
    buf3.setNumber(NumberFormat.Int8LE, 0, 6)
    pins.i2cWriteBuffer(42, buf3, false)
    basic.pause(10)
    let rx = pins.i2cReadBuffer(42, 2)
    return rx[0] + 256 * rx[1]
}

function Get_Right_Touch_Value(): number {
    return Get_Touch_Values()[1]
}

while (true) {
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(Get_Right_Touch_Value())
        basic.clearScreen()
    }
    
}
