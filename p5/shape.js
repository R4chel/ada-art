function Shape({
    center,
    radius,
    noise,
    numPoints,
    color,

}) {
    this.center = center;
    this.radius = radius;
    this.color = color;
    this.noise = noise;
    this.points = [];


    this.onCreation = function() {
        for (let i = 0; i < numPoints; i++) {
            this.points.push(
                { r : randomGaussian(0, this.noise) }
               

            )
        }

    }

    this.draw = function({fillMode}) {
        switch (fillMode){
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
            fill(this.color.r, this.color.g,this.color.b, random(255));
            break;


        };
        stroke(toColor(this.color));
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

    this.update = function(canvas){
        for (let i = 0; i < numPoints; i++) {
            
            let p = this.points[i];
            let update = randomGaussian(( this.radius - p.r ) / 2, this.noise);
            p.r += update;
            if(p.r + this.radius < 5){
                p.r += 5;
            }
        }

        let center_x_update = randomGaussian(0, this.noise /2);
        let center_y_update = randomGaussian(0, this.noise /2 );
        this.center.x = constrain(center.x+center_x_update, 0, canvas.width);
        this.center.y = constrain(center.y+center_y_update, 0, canvas.height);

    } 
    
    this.onCreation();

}

function toColor(x) {
    return color(x.r, x.g, x.b);
}