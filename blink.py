import board
import digitalio
import time

led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

print("Hello World")
while True:

    led.value = True
    time.sleep(0.5)
    led.value = False
    time.sleep(0.7)

