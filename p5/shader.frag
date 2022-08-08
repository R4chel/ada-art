precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 resolution;
uniform float time;
uniform float mouse;
uniform int key;

float key_float = float(key);

vec4 PrettyColors(){
     vec2 st = gl_FragCoord.xy/resolution;
     if (key == 0){
          return vec4(st, cos(time),1.0);
     }
     if (key == 1){
          return vec4(sin(time),st,1.0);
     }
     if (key == 2){
          return vec4(sin(st.y),sin(time*time),cos(st.y),1.0);
     }
     if (key == 3){
          return vec4(cos(st.x),sin(time),tan(st.y),1.0);
     }
     
     return vec4(cos(st.x),sin(st.y),sin(time*key_float),1.0);
}

void main() {
	gl_FragColor = PrettyColors();

}
