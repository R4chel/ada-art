const NUM_COLOR_MODES = 8;

function Art(canvas) {
    this.canvas = canvas;
    this.shapes = [];
    this.min_radius = 5;
    this.max_radius = 100;
    this.colorIndex = 0;
    this.numPoints = 50;
    this.noise = 5;
    this.fillModes = ["filled", "noFill", "whiteFill", "randomOpacity"]
    this.fillModeIndex = 2;
    this.move = true;

    this.heart = false;


    this.draw = function(soundwave, amplitude) {
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].drawSound({
                fillMode: this.fillModes[this.fillModeIndex],
                soundwave: soundwave,
                amplitude : min( amplitude * 100 , 1.0),
                min_radius : this.min_radius ,
                canvas:  this.canvas,
                drawHeart : this.heart,
            });
        }
    }

    this.update = function() {
        if (this.move) {

            for (let i = 0; i < this.shapes.length; i++) {
                this.shapes[i].update(this.canvas);
            }
        }

    }

    this.encoderSwitch = function(encoder_switch_value) {
        console.log("TODO: encoder switch", encoder_switch_value);
    }

    this.encoder = function(value) {
        // if (value > -20) {
        //     frameRate(value + 20);
        // }
    }

    this.addShape = function() {
        let s =
            new Shape({
                center: this.canvas.randomPoint(),
                radius: floor(random(this.min_radius, this.max_radius + 1)),
                color: this.randomColor(),
                numPoints: this.numPoints,
                noise: this.noise,
            });
        this.shapes.push(s);
    }

    
    this.keyPress = function(key) {
        console.log("TODO", key);
        switch (key) {
            case 0:
                this.addShape();
                break;
            case 1:
                this.fillModeIndex = (this.fillModeIndex + 1) % this.fillModes.length;
                break;

        case 3:
            this.heart = !this.heart;
            console.log("heart", this.heart)
            break;

            case 9:

                this.colorIndex = (this.colorIndex + 1) % NUM_COLOR_MODES;
                break;
            case 10:
                this.move = !this.move;
                break;
            case 11:
            case 2:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            default:
                console.log("TODO!", key);
        }
        if (this.shapes.length == 0) {
            this.colorIndex = key;
            if (key > 6) {
                this.min_radius += key;
                this.max_radius += key;
            } else {
                this.min_radius -= key;
                this.max_radius -= key;
            }
            this.addShape();
        }

    }

    this.randomColor = function() {

        let vals = [...Array(3)].map(() => random(255));
        vals.sort();
        switch (this.colorIndex) {
            case 0:
                return {
                    r: vals[0], g: vals[1], b: vals[2]
                };
            case 1:
                return {
                    r: vals[0], g: vals[2], b: vals[1]
                };
            case 2:
                return {
                    r: vals[1], g: vals[0], b: vals[2]
                };
            case 3:
                return {
                    r: vals[1], g: vals[2], b: vals[1]
                };
            case 4:
                return {
                    r: vals[2], g: vals[0], b: vals[1]
                };
            case 5:
                return {
                    r: vals[2], g: vals[1], b: vals[0]
                };
            case 6:
                return {
                    r: vals[1], g: vals[1], b: vals[1]
                };
            case 7:
            // IF YOU ADD THINGS HERE UPDATE NUM COLOR MODES 
            case 8:
            case 9:
            case 10:
            case 11:

            default:
                return {
                    r: random(255), g: random(255), b: random(255)
                };

        }
    }
}
