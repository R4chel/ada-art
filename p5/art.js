
function Art(width, height){
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.minRadius = 5;
    this.maxRadius = 50;
    this.shapeModeIndex = 0;
    this.shapeModes = ["circle", "square"];

    this.draw= function(){
        let shapeMode = this.shapeModes[this.shapeModeIndex];
        for(let i = 0; i < this.shapes.length; i++){
            shape= this.shapes[i];
            shape.draw(shapeMode);
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
            break;
        case 2:
            this.shapeModeIndex = (this.shapeModeIndex + 1)% this.shapeModes.length;
            break;
           
        default:
            console.log("TODO");

        }
        
    }
}
