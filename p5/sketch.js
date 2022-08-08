let connection;
let art;
let debug = true;
let theShader;

function setup() {
    angleMode(RADIANS);
    ellipseMode(RADIUS);
    rectMode(RADIUS);
    let canvas = new Canvas(windowWidth, windowHeight); 
    art = new Art(canvas, theShader);

    port = "/dev/tty.usbmodem1103";
    // port = "/dev/tty.usbmodem103";
    connection = new Connection(on_update);
    connectionSetup(connection, port);
    
}

function preload(){

    theShader = loadShader('shader.vert', 'shader.frag');

}


function on_update(update){
    let action = false;
    data = JSON.parse(update);
    if(data.key !== undefined){
        art.keyPress(data.key);
        action = true;
    }
    if(data.encoder_switch !== undefined ) {
        art.encoderSwitch(data.encoder_switch);
        action = true;
    }
    if(data.encoder !== undefined ) {
        art.encoder(data.encoder);
        action = true;
    }
    if(!action){
        console.log("TODO", update);
    }
}


function draw() {

    art.draw();
    art.update();
}

