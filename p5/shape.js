function Shape(center, radius, color) {
    this.center = center;
    this.r = radius;
    this.color = color;

    this.draw = function () {
        noStroke();
        fill(this.color);
        circle(this.center.x,this.center.y, this.r);
    }
}
