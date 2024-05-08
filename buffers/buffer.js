window.createBuffer = function(vertices) {
    const verticesCpuBuffer = new Float32Array(vertices);
    const geoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesCpuBuffer, gl.STATIC_DRAW);
    return geoBuffer;
};
