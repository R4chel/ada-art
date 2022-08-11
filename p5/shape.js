function Shape({
    center,
    radius,
    noise,
    numPoints,
    color,
    default_shape,


}) {
    this.center = center;
    this.radius = radius;
    this.color = color;
    this.noise = noise;
    this.points = [];
    this.thetaOffset = random(0, 2 * PI);
    this.b = floor(random(2,6));
    this.default_shape_kind = default_shape;

    this.onCreation = function() {
        for (let i = 0; i < numPoints; i++) {
            this.points.push({
                r: randomGaussian(0, this.noise)
            })
        }

    }

    this.drawColors = function(fillMode) {
        switch (fillMode) {
            case "noFill":
                noFill();
                break;
            case "filled":
                fill(toColor(this.color));
                break;

            case "whiteFill":
                fill("white");
                break;
            case "randomOpacity":
                fill(this.color.r, this.color.g, this.color.b, random(255));
                break;


        };
        stroke(toColor(this.color));

    }

    this.draw = function({
        fillMode
    }) {
        this.drawColors(fillMode);
        beginShape();
        for (let i = 0; i < numPoints; i++) {
            let theta = i * 2 * PI / numPoints;
            let p = this.points[i];
            let x = cos(theta) * (this.radius + p.r) + this.center.x;
            let y = sin(theta) * (this.radius + p.r) + this.center.y;
            curveVertex(x, y);
        }
        endShape(CLOSE);

    }

    function fancyHeart(scale, t) {
        // source : https://pavpanchekha.com/blog/heart-polar-coordinates.html
        // note: looks bad if numPoints < 360
        let r = (Math.sin(t) * Math.sqrt(Math.abs(Math.cos(t)))) / (Math.sin(t) + 7 / 5) - 2 * Math.sin(t) + 2;
        return r * scale;
    }


    this.rByShape = function(shapeKind, r, theta) {
        switch (shapeKind) {
        case "rose":
            return r*sin(this.b * theta)
            case "square":
                return r * min(1 / abs(cos(theta)), 1 / abs(sin(theta)))
            case "heart":
                return fancyHeart(r, theta + this.thetaOffset);
                break;

            case "circle":
            default:
                return r;
                break;

        }
    }
    this.drawSound = function({
        fillMode,
        soundwave,
        amplitude,
        canvas,
        min_radius,
        shapeKind
    }) {
        shapeKind = shapeKind == null? this.default_shape_kind : shapeKind; 
        this.drawColors(fillMode);
        stroke(toColor(this.color));
        beginShape();
        let radius = this.radius;
        if (amplitude != 0) {

            radius = lerp(min_radius, this.radius, amplitude);
        }
        for (let i = 0; i < soundwave.length; i++) {
            let theta = i * 2 * PI / soundwave.length;
            let r = map(soundwave[i], -1, 1, 0, radius * 2);
            r = this.rByShape(shapeKind, r, theta);
            let x = cos(theta) * (r) + this.center.x;
            let y = sin(theta) * (r) + this.center.y;
            curveVertex(x, y);
        }
        endShape(CLOSE);

    }
    this.update = function(canvas) {
        for (let i = 0; i < numPoints; i++) {

            let p = this.points[i];
            let update_mean =
                (p.r > 2 * radius || p.r < radius / 2) ? (this.radius - p.r) / 2 : 0;
            let update = randomGaussian(update_mean, this.noise);
            p.r += update;
            if (p.r + this.radius < 5) {
                p.r += 5;
            }
        }

        let center_x_update = randomGaussian(0, this.noise);
        let center_y_update = randomGaussian(0, this.noise);
        this.center.x = constrain(center.x + center_x_update, 0, canvas.width);
        this.center.y = constrain(center.y + center_y_update, 0, canvas.height);
        this.thetaOffset += random(-PI / 10, PI / 10);

    }

    this.onCreation();

}

function toColor(x) {
    return color(x.r, x.g, x.b);
}
