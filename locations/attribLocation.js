window.utilAttribLocation = function(programName, attributeName) {
    const program = window[programName];
    const attributeLocation = gl.getAttribLocation(program, attributeName);
    if (attributeLocation < 0) {
        showError(`Failed to get attribute location for ${attributeName}`);
        return null;
    }
    return attributeLocation;
};
