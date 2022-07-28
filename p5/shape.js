function Shape(center, radius, color) {
    this.center = center;
    this.r = radius;
    this.color = color;

    this.draw = function ({shapeMode, destColor, lerpAmount}) {
        noStroke();
        
        stroke(this.color);
        let fillColor = lerpColor(this.color,destColor,lerpAmount);
        fill(fillColor)
        switch(shapeMode)
        {
            case "circle":
                circle(this.center.x,this.center.y, this.r);
                break;
            case "square":
            square(this.center.x, this.center.y, this.r);
            break;
            default:
            console.log(shapeMode)


        }
    }
}
