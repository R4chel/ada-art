# source: https://learn.adafruit.com/adafruit-macropad-rp2040/macropad-basics
# SPDX-FileCopyrightText: Copyright (c) 2021 Kattni Rembor for Adafruit Industries
#
# SPDX-License-Identifier: Unlicense
"""
Simpletest demo for MacroPad. Prints the key pressed, the relative position of the rotary
encoder, and the state of the rotary encoder switch to the serial console.
"""
import time
from rainbowio import colorwheel
from adafruit_macropad import MacroPad

macropad = MacroPad()

tones = [196, 220, 246, 262, 294, 330, 349, 392, 440, 494, 523, 587]

debug = False
while True:
    key_event = macropad.keys.events.get()
    if key_event and key_event.pressed:
        print("Key pressed: {}".format(key_event.key_number))
        macropad.pixels[key_event.key_number] = colorwheel(
                int(255 / 12) * key_event.key_number
            )
        macropad.play_tone(tones[key_event.key_number], 0.5)
    else:
            macropad.pixels.fill((0, 0, 0))
    if debug:
        print("Encoder: {}".format(macropad.encoder))
        print("Encoder switch: {}".format(macropad.encoder_switch))
