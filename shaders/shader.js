window.vertexShaderSourceCode = `
precision mediump float;

attribute vec3 vertexPosition;

uniform float u_aspectRatio;

void main() {
    // This part essentially divides the x and y coordinates by the aspect ratio and 1.0 respectively to appear normal for any given aspect ratio. In this case 16:9

    vec2 scaledPosition = vertexPosition.xy / vec2(u_aspectRatio, 1.0);
    vec4 scaledAspectMatrix = vec4(scaledPosition, vertexPosition.z, 1.0);

    gl_Position = scaledAspectMatrix;
}`;

window.fragmentShaderSourceCode = `
precision mediump float;

void main() {
    gl_FragColor = vec4(0.8,0,0,1);
}`;
