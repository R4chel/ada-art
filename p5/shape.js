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
    this.thetaOffset = random(0, 2 * PI);
    this.b = floor(random(2,6));
    this.default_shape_kind = default_shape;

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

    this.draw = function({
        fillMode,
        soundwave,
        amplitude,
        canvas,
        min_radius,
        shapeKind
    }) {
        shapeKind = shapeKind === undefined? this.default_shape_kind : shapeKind; 
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

        let center_x_update = randomGaussian(0, this.noise);
        let center_y_update = randomGaussian(0, this.noise);
        this.center.x = constrain(center.x + center_x_update, 0, canvas.width);
        this.center.y = constrain(center.y + center_y_update, 0, canvas.height);
        this.thetaOffset += random(-PI / 10, PI / 10);

    }

}

function toColor(x) {
    return color(x.r, x.g, x.b);
}
