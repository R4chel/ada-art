function Shape({
    center,
    radius,
    color,
    velocity,
    direction
}) {
    this.center = center;
    this.r = radius;
    this.color = color;
    this.velocity = velocity;
    this.direction = direction === undefined ? random(0, Math.PI * 2) : direction;

    this.draw = function({
        shapeMode,
        destColor,
        lerpAmount
    }) {
        noStroke();
        stroke(this.color);
        let fillColor = lerpColor(this.color, destColor, lerpAmount);
        fill(fillColor);
        switch (shapeMode) {
            case "circle":
                circle(this.center.x, this.center.y, this.r);
                break;
            case "square":
                square(this.center.x, this.center.y, this.r);
                break;
            default:
                console.log(shapeMode);
        };
    }

    this.update = function({width, height, wander}) {
        this.center.x = this.center.x + cos(this.direction) * this.velocity;
        this.center.y = this.center.y + sin(this.direction) * this.velocity;
        if(this.center.x > width){
            this.center.x -= width;
        }
        if(this.center.x <0) {
            this.center.x += width;
        }
        if(this.center.y > height){
            this.center.y -= height; 
        }
        if(this.center.y < 0){
            this.center.y += height;
        }
        this.direction = this.direction + random(-wander, wander);
        this.radius += random(-1,1);
        
    }

    this.reverse = function() {
        this.direction += Math.PI;
    }

    this.updateSpeed = function(f){
        this.velocity = f(this.velocity)
    }
}

function brownianUpdate(x, delta, min, max) {
    x += random(-1 * delta, delta);
    let remainder = x % (max - min);
    return remainder > 0 ? remainder + min : remainder + max;
}
