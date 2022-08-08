precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// we need the sketch resolution to perform some calculations
uniform vec2 resolution;
uniform float time;
uniform float mouse;



void main() {
  vec2 st = gl_FragCoord.xy/resolution;
	gl_FragColor = vec4(st, cos(time),1.0);
}
