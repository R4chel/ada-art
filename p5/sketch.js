let connection;
let art;

function setup() {
    angleMode(RADIANS);
    ellipseMode(RADIUS);
    rectMode(RADIUS);
     
    createCanvas(windowWidth, windowHeight);
    art = new Art(windowWidth, windowHeight)

    port = "/dev/tty.usbmodem1103";
    connection = new Connection(on_update);
    connectionSetup(connection, port);

}


function on_update(update){
    data = JSON.parse(update)
    if(data.key === undefined){
        console.log(data)
    }
    else{
        art.keyPress(data.key)
    }
}

function draw() {
  background(255, 255, 255);
    art.draw();
}
