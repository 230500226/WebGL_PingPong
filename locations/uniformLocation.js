window.utilUniformLocation= function(program, uniformName) {
    const uniformLocation = gl.getUniformLocation(program, uniformName);
    if (uniformLocation < 0) {
        showError(`Failed to get uniform location for ${uniformName}`);
        return null;
    }
    return uniformLocation;
};
