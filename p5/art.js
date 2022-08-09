function Art(canvas, theShader) {
    this.theShader = theShader;
    this.canvas = canvas;
    this.timeModifier = 0.01;
    this.key=0;


    this.draw = function() {
        shader(this.theShader);
        theShader.setUniform('resolution', [this.canvas.width, this.canvas.height]);
        theShader.setUniform('mouse', map(mouseX, 0, width, 0, 7));
        theShader.setUniform('time', frameCount * this.timeModifier);
        theShader.setUniform('key', this.key);
        rect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.update = function() {}


    this.encoderSwitch = function(encoder_switch_value) {
    }


    this.encoder = function(value) {
        if(value < 10){
            console.log("TODO, deal with small numbers");
        }
        else{
            this.timeModifier = 0.01 + 0.001 * value;
            
        }
    }

    this.keyPress = function(key) {
        this.key = key;
        switch (key) {
            case 0:

            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            default:
                console.log("TODO!", key);


        }

    }
}
