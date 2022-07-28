let connection;
let art;

function setup() {
    console.log("1")
    createCanvas(windowWidth, windowHeight);
    console.log("2")
    port = "/dev/tty.usbmodem1103";
    connection = new Connection(on_update);
    console.log("3")
    connectionSetup(connection, port);
    console.log("4")
    art = new Art()

}


function on_update(update){
    console.log("todo")
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  text(connection.latestData, 10, 10);
}
