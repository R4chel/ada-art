function Shape({
    center,
    radius,
    fillColor,
    velocity,
    direction,
    maxPoints,
}) {
    this.center = center;
    this.radius = radius;
    this.fillColor = fillColor;
    this.velocity = velocity;
    this.direction = direction === undefined ? random(0, Math.PI * 2) : direction;
    this.previousCenter = center;
    this.maxPoints = maxPoints;
    this.points = [center];

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
            case "line":
                strokeWeight(3);
                line(this.previousCenter.x, this.previousCenter.y, this.center.x, this.center.y);
                break;
        case "line2":
            noFill();
            beginShape();
            for(let i = 0; i < this.points.length; i++){
                let p = this.points[i];
                curveVertex(p.x,p.y);
            }
            endShape();
            break;
        case "line3":
            noFill();
            beginShape();
            for(let i = 0; i < this.points.length; i++){
                let p = this.points[i];
                curveVertex(p.x,p.y);
            }
            endShape();
            break;
            default:
                console.log(shapeMode);
        };
    }

    this.update = function({
        canvas,
        wander,
        maxColorDelta
    }) {
        this.previousCenter = {
            x: this.center.x,
            y: this.center.y
        };
        let newCenter = {x: this.center.x + cos(this.direction) * this.velocity + random(-wander, wander), 
                         y :this.center.y + sin(this.direction) * this.velocity + random(-wander, wander)};
       
        if (newCenter.x > canvas.width) {
            newCenter.x -= canvas.width;
        }
        if (newCenter.x < 0) {
            newCenter.x += canvas.width;
        }
        if (newCenter.y > canvas.height) {
            newCenter.y -= canvas.height;
        }
        if (newCenter.y < 0) {
            newCenter.y += canvas.height;
        }
        this.points.push(newCenter);
        if(this.points.length > this.maxPoints){
            this.points.shift();
        }
        this.center = newCenter;
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

function brownianUpdate(x, delta, low, high) {
    let y = x + random(-delta, delta);
    return min(high, max(y, low));
}

