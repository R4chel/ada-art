let connection;
let art;
let debug = true;

let mic, micLevel ;
let fft;
let frequencies = ["bass", "lowMid", "mid", "highMid", "treble"];

let seed = 0;
let canvasSize = 1000;

function setup() {
    seed = seed === undefined ? floor(random(1000000)) : seed;
    let canvasWidth = canvasSize === undefined ? windowWidth : canvasSize;
    let canvasHeight= canvasSize === undefined ? windowHeight: canvasSize;
    randomSeed(seed);
    angleMode(RADIANS);
    ellipseMode(RADIUS);
    rectMode(RADIUS);
    let canvas = new Canvas(canvasWidth, canvasHeight); 
    art = new Art(canvas);

    port = "/dev/tty.usbmodem1103";
    // port = "/dev/tty.usbmodem103";
    connection = new Connection(on_update);
    connectionSetup(connection, port);

    mic = new p5.AudioIn();
    fft = new p5.FFT();
    mic.connect(fft);

    mic.start();
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

    console.log(seed);

    let spectrum = fft.analyze();
    let soundwave = fft.waveform();
    let amplitude = mic.getLevel();

    art.draw(soundwave, amplitude);
    art.update();
}


// This is a fix for chrome:
// https://github.com/processing/p5.js-sound/issues/249
function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}
