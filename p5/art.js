function Art(canvas, theShader) {
    this.theShader = theShader;
    this.canvas = canvas;
     

    this.draw = function() {
        shader(this.theShader);
        rect(0,0,this.canvas.width, this.canvas.height);
    }

    this.update = function() {
    }


    this.encoderSwitch = function(encoder_switch_value) {
        if (encoder_switch_value) {
            this.lerpColorIndex = (this.lerpColorIndex + 1) % this.lerpColors.length;
            this.applyToAll((shape) => shape.updateSpeed((speed) => speed / 2));
        }
        this.reverseAll();

    }


    this.encoder = function(value) {
        this.lerpPercent = value / 100;
        this.maxVelocity = abs(value);
        // this.updateSpeeds(value / 10 );

        if (value > this.oldEncoder) {
            this.applyToAll((shape) => shape.updateSpeed((speed) => (speed * randomGaussian(1.5, 0.1))));
        } else {
            this.applyToAll((shape) => shape.updateSpeed((speed) => {
                return speed * randomGaussian(0.75, 0.1);
            }));
        }
        this.oldEncoder = value;
    }

    this.keyPress = function(key) {
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

