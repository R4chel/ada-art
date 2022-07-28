import board
from rainbowio import colorwheel
from adafruit_macropad import MacroPad
from time import sleep

import busio
import digitalio

import usb_cdc
import json


print( "hello")

serial = usb_cdc.data
print(serial.connected)
print("here")

# For most CircuitPython boards


macropad = MacroPad()
while True:
    key_event = macropad.keys.events.get()
    if key_event and key_event.pressed:
        print("Key pressed: {}".format(key_event.key_number))
        data = {"key:", key_event.key_number}
        serial.write(json.dumps(data).encode())
        serial.flush()
