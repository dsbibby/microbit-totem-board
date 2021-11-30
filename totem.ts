enum MotorDirection {
    Forward = 0,
    Reverse = 1
}

let beepBuf = pins.createBuffer(3)
let buzzBuf = pins.createBuffer(3)
let ledBuf = pins.createBuffer(5)
let readBuf = pins.createBuffer(1)

//% color="#AA278D" weight=100 icon="\uf013"
namespace totemBoard {
    //% block="run motor %direction for %duration ms"
    export function runMotorFor(direction: MotorDirection, duration: number): void {
        let pin = DigitalPin.P13
        if (direction == MotorDirection.Reverse) {
            pin = DigitalPin.P14
        }
        pins.digitalWritePin(pin, 1)
        basic.pause(duration)
        pins.digitalWritePin(pin, 0)
    }

    //% block
    export function runMotor(direction: MotorDirection): void {
        let pin = DigitalPin.P13
        if (direction == MotorDirection.Reverse) {
            pin = DigitalPin.P14
        }
        pins.digitalWritePin(pin, 1)
    }
    
    //% block
    export function stopMotor(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }

    //% block="set led %id to red %red green %green blue %blue"
    //% inlineInputMode=inline
    //% id.min=0 id.max=4 red.min=0 red.max=254 green.min=0 green.max=254 blue.min=0 blue.max=254
    export function setLed(id: number, red: number, green: number, blue: number): void {
        ledBuf.setNumber(NumberFormat.UInt8LE, 0, 0)
        ledBuf.setNumber(NumberFormat.UInt8LE, 1, id)
        ledBuf.setNumber(NumberFormat.UInt8LE, 2, red)
        ledBuf.setNumber(NumberFormat.UInt8LE, 3, green)
        ledBuf.setNumber(NumberFormat.UInt8LE, 4, blue)
        pins.i2cWriteBuffer(42, ledBuf, false)
        basic.pause(150)
    }

    function getTouchValues(): Buffer {
        //let buf = control.createBuffer(1)
        readBuf.setNumber(NumberFormat.UInt8LE, 0, 5)
        pins.i2cWriteBuffer(42, readBuf, false)
        basic.pause(150)
        return pins.i2cReadBuffer(42, 2)
    }

    //% block
    export function leftTouchValue(): number {
        return getTouchValues()[0]
    }

    //% block
    export function rightTouchValue(): number {
        return getTouchValues()[1]
    }

    //% block
    export function leftTouch(): boolean {
        return leftTouchValue() > 0
    }

    //% block
    export function rightTouch(): boolean {
        return rightTouchValue() > 0
    }

    //% block
    export function lightLevel(): number {
        //let buf = control.createBuffer(1)
        readBuf.setNumber(NumberFormat.UInt8LE, 0, 6)
        pins.i2cWriteBuffer(42, readBuf, false)
        basic.pause(10)
        let rx = pins.i2cReadBuffer(42, 2)
        return rx[0] + 256 * rx[1]
    }

    //% block="buzz for %duration ms wth power %power"
    //% power.min=0 power.max=254
    export function buzz(duration: number, power: number): void {
        buzzBuf.setNumber(NumberFormat.UInt8LE, 0, 2)
        buzzBuf.setNumber(NumberFormat.UInt16LE, 1, duration)
        buzzBuf.setNumber(NumberFormat.UInt8LE, 2, power)
        pins.i2cWriteBuffer(42, buzzBuf, false)
        basic.pause(150)
    }

    //% block="beep at %frequency Hz for %duration ms"
    //% duration.min=100
    export function beep(frequency: number, duration: number): void {
        beepBuf.setNumber(NumberFormat.UInt8LE, 0, 1)
        beepBuf.setNumber(NumberFormat.UInt16LE, 1, frequency)
        beepBuf.setNumber(NumberFormat.UInt16LE, 2, duration)
        pins.i2cWriteBuffer(42, beepBuf, false)
        basic.pause(duration)
        if (frequency > 0) {
            stopBeep()
        }
    }

    //% block
    export function stopBeep(): void {
        beepBuf.setNumber(NumberFormat.UInt8LE, 0, 1)
        beepBuf.setNumber(NumberFormat.UInt16LE, 1, 0)
        beepBuf.setNumber(NumberFormat.UInt16LE, 2, 0)
        pins.i2cWriteBuffer(42, beepBuf, false)
        basic.pause(150)
        //beep(0, 0)
    }
}
