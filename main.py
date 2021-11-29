def Motor_Down():
    pins.digital_write_pin(DigitalPin.P13, 1)
    basic.pause(5000)
    pins.digital_write_pin(DigitalPin.P13, 0)
def Get_Left_Touch_Value():
    return Get_Touch_Values()[0]
def Set_LED(number: number, red: number, green: number, blue: number):
    buf2 = bytearray(5)
    buf2.set_number(NumberFormat.INT8_LE, 0, 0)
    buf2.set_number(NumberFormat.INT8_LE, 1, number)
    buf2.set_number(NumberFormat.INT8_LE, 2, red)
    buf2.set_number(NumberFormat.INT8_LE, 3, green)
    buf2.set_number(NumberFormat.INT8_LE, 4, blue)
    pins.i2c_write_buffer(42, buf2, False)

def on_button_pressed_b():
    Set_LED(1, 0, 0, 255)
    Set_LED(2, 0, 255, 255)
    Set_LED(3, 255, 255, 255)
    Set_LED(4, 255, 255, 0)
input.on_button_pressed(Button.B, on_button_pressed_b)

def Get_Touch_Values():
    buf = bytearray(1)
    buf.set_number(NumberFormat.INT8_LE, 0, 5)
    pins.i2c_write_buffer(42, buf, False)
    basic.pause(150)
    return pins.i2c_read_buffer(42, 2)
def Motor_Up():
    pins.digital_write_pin(DigitalPin.P14, 1)
    basic.pause(5000)
    pins.digital_write_pin(DigitalPin.P14, 0)
def Get_Light_level():
    buf3 = bytearray(1)
    buf3.set_number(NumberFormat.INT8_LE, 0, 6)
    pins.i2c_write_buffer(42, buf3, False)
    basic.pause(10)
    rx = pins.i2c_read_buffer(42, 2)
    return rx[0] + 256 * rx[1]
def Get_Right_Touch_Value():
    return Get_Touch_Values()[1]
while True:
    if input.button_is_pressed(Button.A):
        basic.show_number(Get_Right_Touch_Value())
        basic.clear_screen()