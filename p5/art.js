function Art(width, height) {
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.minRadius = 5;
    this.maxRadius = 50;
    this.shapeModeIndex = 0;
    this.shapeModes = ["circle", "square", "line", "line2","line3"];
    this.lerpColors = [color("white"), color("black")];
    this.lerpColorIndex = 0;
    this.lerpPercent = 0;
    this.dontLerp = true;
    this.wander = Math.PI / 10;
    this.minVelocity = 0;
    this.maxVelocity = 20;
    this.oldEncoder = 0;
    this.changeColor = false;
    this.maxColorDelta = 1;
    this.drawBackground = false;
    this.minOpacity = 255;
    this.maxShapes = 100;
    this.maxPoints = 100;
     

    this.draw = function() {
        if (this.drawBackground) {
            background(255, 255, 255);
        }
        let shapeMode = this.shapeModes[this.shapeModeIndex];
        let destColor = this.lerpColors[this.lerpColorIndex];
        let lerpAmount = this.dontLerp ? 0 : this.lerpPercent;
        for (let i = 0; i < this.shapes.length; i++) {
            let shape = this.shapes[i];
            shape.draw({
                shapeMode: shapeMode,
                destColor: destColor,
                lerpAmount: lerpAmount,
                opacity: random(this.minOpacity, 1)
            });
        }
    }

    this.update = function() {
        let maxColorDelta = this.changeColor ? this.maxColorDelta : 0;
        for (let i = 0; i < this.shapes.length; i++) {
            shape = this.shapes[i];
            shape.update({
                wander: this.wander,
                height: this.height,
                width: this.width,
                maxColorDelta: maxColorDelta
            });
        }
    }

    this.addShape = function() {
        let center = {
            x: random(0, this.width),
            y: random(0, this.height)
        };
        let c = randomColor();
        let radius = random(this.minRadius, this.maxRadius);
        let shape = new Shape({
            center: center,
            radius: radius,
            fillColor: c,
            velocity: random(this.minVelocity, this.maxVelocity),
            maxPoints : this.maxPoints
        });

        this.shapes.push(shape);
    }

    this.applyToAll = function(f) {
        for (let i = 0; i < this.shapes.length; i++) {
            shape = this.shapes[i];
            f(shape);
        }

    }
    this.reverseAll = function() {
        this.applyToAll((shape) => shape.reverse());
    }

    this.removeShape = function() {
        if (this.shapes.length > 0) {
            this.shapes.splice(Math.floor(Math.random() * this.shapes.length), 1);

        }
    }


    this.encoderSwitch = function(encoder_switch_value) {
        if (encoder_switch_value) {
            this.lerpColorIndex = (this.lerpColorIndex + 1) % this.lerpColors.length;
            this.applyToAll((shape) => shape.updateSpeed((speed) => speed / 2));
        }
        this.reverseAll();

    }

    this.updateSpeeds = function(value) {
        this.applyToAll((shape) => {
            let maxDelta = value / (shape.radius ** 2);
            shape.velocity += random(-maxDelta, maxDelta);
        })
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

    this.splitAll = function() {
        let newShapes = [];
        this.applyToAll((shape) => {
            if(shape.radius > this.minRadius && this.shapes.length + newShapes.length < this.maxShapes){
                

            let angle = random(0, Math.PI * 2);
            let newCenter = {
                x: shape.center.x + cos(angle) * shape.radius,
                y: shape.center.y + sin(angle) * shape.radius
            };
            shape.radius *= 0.5;
            shape.velocity *= 2;
            let newShape = new Shape({
                center: newCenter,
                radius: shape.radius,
                fillColor: shape.fillColor,
                velocity: shape.velocity,
                direction: -shape.direction
            });
            newShapes.push(newShape);
            }
        });
        this.shapes.push(...newShapes);
    }
    this.keyPress = function(key) {
        switch (key) {
            case 0:
            this.applyToAll((shape) => {
                    let newColor = randomColor();
                shape.fillColor = newColor; }); 
                break;
            case 1:
                this.addShape();
                break;
            case 2:
                this.shapeModeIndex = (this.shapeModeIndex + 1) % this.shapeModes.length;
                break;
            case 3:
                this.applyToAll((shape) => shape.reverse());
                break;
            case 4:
                this.changeColor = !this.changeColor;
            this.maxColorDelta += 1;  
            console.log(this.changeColor, this.maxColorDelta)
                break;

            case 5:
            
                let amt = random(0, 2);
                this.applyToAll((shape) => {
                    shape.radius *= amt;
                    shape.velocity *= 1 / amt;
                });
            // let updateAmt = random(-5, 5);
            // this.applyToAll((shape) => {
            //     shape.radius += updateAmt;
            //     shape.velocity -= updateAmt;
            // });
                break;
            case 6:
            this.dontLerp = !this.dontLerp; 
                break;
            case 7:
                this.drawBackground = !this.drawBackground;
                break;
            case 8:
                this.wander *= randomGaussian(1, 0.25);
                this.wander = abs(this.wander);
                break;
            case 9:
                this.splitAll();
                break;
            case 10:
                this.removeShape();
                break;
            case 11:
                this.minOpacity = random([150, 255]);
            
                break;
            default:
                console.log("TODO!", key);


        }

    }
}

function randomColor() {

    return {
        r: random(255),
        g: random(255),
        b: random(255)
    };
}
