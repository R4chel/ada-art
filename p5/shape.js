function Shape({
    center,
    radius,
    fillColor,
    velocity,
    direction
}) {
    this.center = center;
    this.radius = radius;
    this.fillColor = fillColor;
    this.velocity = velocity;
    this.direction = direction === undefined ? random(0, Math.PI * 2) : direction;
    

    this.draw = function({
        shapeMode,
        destColor,
        lerpAmount,
        opacity
    }) {
        let c = color(this.fillColor.r, this.fillColor.g, this.fillColor.b, opacity);
        stroke(c);
        let fillColor = lerpColor(c, destColor, lerpAmount);
        fill(fillColor);
        switch (shapeMode) {
            case "circle":
                circle(this.center.x, this.center.y, this.radius);
                break;
            case "square":
                square(this.center.x, this.center.y, this.radius);
                break;
            default:
                console.log(shapeMode);
        };
    }

    this.update = function({
        width,
        height,
        wander,
        maxColorDelta
    }) {
        this.center.x = this.center.x + cos(this.direction) * this.velocity + random(-wander,wander);
        this.center.y = this.center.y + sin(this.direction) * this.velocity + random(-wander,wander);
        if (this.center.x > width) {
            this.center.x -= width;
        }
        if (this.center.x < 0) {
            this.center.x += width;
        }
        if (this.center.y > height) {
            this.center.y -= height;
        }
        if (this.center.y < 0) {
            this.center.y += height;
        }
        this.direction = (this.direction + random(-wander, wander)) % (Math.PI * 2);
        let radiusUpdate = random(-1, 1);
        this.radius += radiusUpdate;
        this.velocity -= radiusUpdate;
        this.fillColor.r = brownianUpdate(this.fillColor.r, maxColorDelta, 0, 255);
        this.fillColor.g = brownianUpdate(this.fillColor.g, maxColorDelta, 0, 255);
        this.fillColor.b = brownianUpdate(this.fillColor.b, maxColorDelta, 0, 255);
    }

    this.reverse = function() {
        this.direction += Math.PI;
    }

    this.updateSpeed = function(f) {
        this.velocity = f(this.velocity);
    }
}

function brownianUpdate(x, delta, min, max) {
    x += random(-1 * delta, delta);
    let remainder = x % (max - min);
    return remainder > 0 ? remainder + min : remainder + max;
}
