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

    this.drawColors(fillMode) {
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
        
    }
    this.draw = function({fillMode}) {
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

    this.drawSound = function({fillMode, soundwave, amplitude, canvas , min_radius}) {
        this.drawColors(fillMode);
        beginShape();
        let radius = lerp(min_radius,this.radius, amplitude);
        // let radius = this.radius;
        for (let i = 0; i < soundwave.length; i++) {
            let theta = i * 2 * PI / soundwave.length;
            let r = map( soundwave[i], -1, 1, 0, radius * 5);
            let x = cos(theta) * (r) + this.center.x;
            let y = sin(theta) * ( r) + this.center.y;
            curveVertex(x, y);
        } 
        endShape(CLOSE);

    }
    this.update = function(canvas){
        for (let i = 0; i < numPoints; i++) {
            
            let p = this.points[i];
            let update_mean =
                (p.r > 2 * radius || p.r < radius / 2) ? ( this.radius - p.r ) / 2 : 0;
            let update = randomGaussian(update_mean, this.noise);
            p.r += update;
            if(p.r + this.radius < 5){
                p.r += 5;
            }
        }

        let center_x_update = randomGaussian(0, this.noise);
        let center_y_update = randomGaussian(0, this.noise);
        this.center.x = constrain(center.x+center_x_update, 0, canvas.width);
        this.center.y = constrain(center.y+center_y_update, 0, canvas.height);

    } 
    
    this.onCreation();

}

function toColor(x) {
    return color(x.r, x.g, x.b);
}
