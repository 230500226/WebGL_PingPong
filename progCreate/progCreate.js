window.createShaderProgram = function(vssc, fssc, programName) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vssc);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        const compileError = gl.getShaderInfoLog(vertexShader);
        showError(`compile vertex error ${programName}: ` + compileError);
        return null;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fssc);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
        const compileError = gl.getShaderInfoLog(fragmentShader);
        showError(`compile fragment error ${programName}: ` + compileError);
        return null;
    }

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        const linkError = gl.getProgramInfoLog(shaderProgram);
        showError(`link program error ${programName}:`+ linkError);
        return null;
    }

    // Store the shader program on the window object with the given name
    window[programName] = shaderProgram;
};
