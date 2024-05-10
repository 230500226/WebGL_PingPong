window.vertexShaderSourceCode = `
precision mediump float;

attribute vec3 vertexPosition;

attribute vec2 vertTexCoord;
varying vec2 fragTexCoord;

uniform float u_aspectRatio;

uniform mat4 u_matrix;

void main() {
    // This part essentially divides the x and y coordinates by the aspect ratio and 1.0 respectively to appear normal for any given aspect ratio. In this case 16:9
    vec2 scaledPosition = vertexPosition.xy / vec2(u_aspectRatio, 1.0);
    vec4 scaledAspectMatrix = vec4(scaledPosition, vertexPosition.z, 1.0);

    fragTexCoord = vertTexCoord;

    gl_Position = u_matrix * scaledAspectMatrix;
}`;

window.fragmentShaderSourceCode = `
precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main() {
    gl_FragColor = texture2D(sampler, fragTexCoord);
}`;
