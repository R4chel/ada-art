precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 resolution;
uniform float time;
uniform float mouse;
uniform int foo;

vec4 PrettyColors(){
     vec2 st = gl_FragCoord.xy/resolution;
     if (foo == 0){
          return vec4(st, cos(time),1.0);
     }
     if (foo == 1){
          return vec4(sin(time),st,1.0);
     }
     return vec4(st,1.0,1.0);
}

void main() {
	gl_FragColor = PrettyColors();

}
