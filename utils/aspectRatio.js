window.aspectRatio = function(program) {
    var aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var u_aspectRatio = window.utilUniformLocation(program, 'u_aspectRatio'); //may show a type error please ignore
    if (u_aspectRatio === null) {
        // utilUniformLocation already showed an error, so just return
        return;
    }
    gl.uniform1f(u_aspectRatio, aspectRatio);
}
