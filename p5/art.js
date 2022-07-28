function Art(width, height){
    this.width = width;
    this.height = height;
    this.shapes = []
    this.minRadius = 5;
    this.maxRadius = 50;

    this.draw= function(){
        for(let i = 0; i < this.shapes.length; i++){
            shape= this.shapes[i];
            shape.draw();
        }
    }
    
    this.addShape = function (){
        let center = { x : random(0, this.width), y : random(0, this.height)};
        let c = color(random(255), random(255), random(255));
        let radius = random(this.minRadius, this.maxRadius);
        let shape = new Shape(center, radius, c);
        this.shapes.push(shape);
    }

    this.keyPress = function(key){
        switch(key){
        case 1:
            this.addShape();
            break
        default:
            console.log("TODO")
        }
        
    }
}
