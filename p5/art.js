function Art(width, height) {
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.minRadius = 5;
    this.maxRadius = 50;
    this.shapeModeIndex = 0;
    this.shapeModes = ["circle", "square"];
    this.lerpColors = [color("white"), color("black")]
    this.lerpColorIndex = 0;
    this.lerpPercent = 0;
    this.wander = Math.PI / 10;
    this.minVelocity = 0;
    this.maxVelocity = 20;

    this.draw = function() {
        let shapeMode = this.shapeModes[this.shapeModeIndex];
        let destColor = this.lerpColors[this.lerpColorIndex];
        for (let i = 0; i < this.shapes.length; i++) {
            let shape = this.shapes[i];
            shape.draw({
                shapeMode: shapeMode,
                destColor: destColor,
                lerpAmount: this.lerpPercent
            });
        }
    }

    this.update = function() {
        for (let i = 0; i < this.shapes.length; i++) {
            shape = this.shapes[i];
            shape.update(this.wander);
        }

    }
    this.addShape = function() {
        let center = {
            x: random(0, this.width),
            y: random(0, this.height)
        };
        let c = color(random(255), random(255), random(255));
        let radius = random(this.minRadius, this.maxRadius);
        let shape = new Shape({
            center: center,
            radius: radius,
            color: c,
            velocity: random(this.minVeloctity, this.maxVelocity)
        });
        this.shapes.push(shape);
    }

    this.removeShape = function() {
        if (this.shapes.length > 0) {
            this.shapes.splice(Math.floor(Math.random() * this.shapes.length), 1)

        }
    }


    this.encoderSwitch = function(encoder_switch_value) {
        if (encoder_switch_value) {
            this.lerpColorIndex = (this.lerpColorIndex + 1) % this.lerpColors.length;
        }
    }

    this.encoder = function(value) {
        this.lerpPercent = value / 100;
    }

    this.keyPress = function(key) {
        switch (key) {
            case 1:
                this.addShape();
                break;
            case 2:
                this.shapeModeIndex = (this.shapeModeIndex + 1) % this.shapeModes.length;
                break;
            case 10:
                this.removeShape();
                break;
            default:
                console.log("TODO");

        }

    }
}
