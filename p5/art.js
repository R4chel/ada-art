function Art(canvas) {
    this.canvas = canvas;

    this.draw = function() {

    }

    this.update = function() {

    }

    this.encoderSwitch = function(encoder_switch_value) {
        console.log("TODO: encoder switch", encoder_switch_value);
    }

    this.encoder = function(value) {
        console.log("TODO: encoder", value);
    }

    this.keyPress = function(key) {
        console.log("TODO", key)
        switch (key) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            default:
                console.log("TODO!", key);
        }

    }
}
