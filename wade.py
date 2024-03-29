import board
from rainbowio import colorwheel
from adafruit_macropad import MacroPad
from time import sleep
import time
import usb_cdc
import json

debug = True

# For most CircuitPython boards


def write_msg(serial, msg):
    message = json.dumps(msg)
    serial.write(bytes(f"{message}\r\n", "utf-8"))
    serial.flush()

serial = usb_cdc.data
macropad = MacroPad()
encoder_value = macropad.encoder
encoder_switch_value = macropad.encoder_switch

while True:
    key_event = macropad.keys.events.get()
    if key_event and key_event.pressed:
        message = {"key": key_event.key_number}
        write_msg(serial, message)
        macropad.pixels[key_event.key_number] = colorwheel(
                int(255 / 12) * key_event.key_number
            )
        if debug:
            print("Key pressed: {}".format(key_event.key_number))

    else:
        macropad.pixels.fill((0, 0, 0))
    if encoder_switch_value != macropad.encoder_switch:
        encoder_switch_value = macropad.encoder_switch
        message = {"encoder_switch": encoder_switch_value}
        write_msg(serial, message)
        if debug:
            print("Encoder switch: {}".format(macropad.encoder_switch))
    if encoder_value != macropad.encoder:
        encoder_value = macropad.encoder
        message = {"encoder": encoder_value}
        write_msg(serial, message)
        if debug:
            print("Encoder: {}".format(macropad.encoder))
