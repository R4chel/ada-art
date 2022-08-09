precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 resolution;
uniform float time;
uniform float mouse;
uniform int key;

float key_float = float(key);

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, sin(time + st.y +st.x));
}

vec4 pretty_colors() {
     vec2 st = gl_FragCoord.xy/resolution;
     float y = st.x;
     float pct = plot(st); 
     vec3 color = vec3(y);
     
     if (key == 0){
          return vec4(st, cos(time),1.0);
     }
     if (key == 1){
          return vec4(sin(time),st,1.0);
     }
     if (key == 2){
          return vec4(sin(st.y+st.x),sin(st.x),cos(st.y),1.0);
     }
     if (key == 3){
          return vec4(cos(st.x),sin(time),tan(st.y),1.0);
     }
     if (key == 4) {
         return vec4((1.0-pct)*color+pct*vec3(st.x*st.y,fract( st.y+st.x ),0.0), 1.0);  
     }
     
     return vec4(cos(st.x),sin(st.y),sin(time*key_float),1.0);
}

void main() {
	gl_FragColor = pretty_colors();

}
