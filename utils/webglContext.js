function getWebGLContext() {
    const canvas  = document.getElementById("IDcanvas");
    window.canvas = canvas;
    if (!canvas){
        showError("Can't find canvas reference");
        return null;
    }
    const gl = canvas.getContext('webgl2');
    if (!gl){
        showError("Can't find webgl2 support");
        return null;
    }
    return gl;
}

window.gl = getWebGLContext();
