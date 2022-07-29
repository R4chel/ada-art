function Shape({center, radius, color, velocity, direction}) {
    this.center = center;
    this.r = radius;
    this.color = color;
    this.velocity = velocity;
    this.direction = direction === undefined ? random(0, Math.PI * 2) : direction;

    this.draw = function ({shapeMode, destColor, lerpAmount}) {
        noStroke();
        stroke(this.color);
        let fillColor = lerpColor(this.color,destColor,lerpAmount);
        fill(fillColor);
        switch(shapeMode)
        {
            case "circle":
                circle(this.center.x,this.center.y, this.r);
                break;
            case "square":
            square(this.center.x, this.center.y, this.r);
            break;
            default:
            console.log(shapeMode);
        };
    }

    this.update = function(wander){
        this.center.x = this.center.x + cos(this.direction) * this.velocity;
        this.center.y = this.center.y + sin(this.direction) * this.velocity;
        this.d = this.d + random(-wander, wander);
    }
}
