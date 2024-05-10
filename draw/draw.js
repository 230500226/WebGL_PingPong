window.draw = function(shaderProgram, vertAtribLoc, geoBuffer, texCoordAtribLoc, texture) {
    // Set up and draw the red
    gl.useProgram(shaderProgram);

    gl.enableVertexAttribArray(vertAtribLoc);
    
    gl.enableVertexAttribArray(texCoordAtribLoc);

    gl.bindBuffer(gl.ARRAY_BUFFER, geoBuffer);
    gl.vertexAttribPointer(vertAtribLoc,2,gl.FLOAT,false,0,0);
    window.aspectRatio(shaderProgram);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.activeTexture(gl.TEXTURE0);

    gl.drawArrays(gl.TRIANGLES, 0,3);
    gl.drawArrays(gl.TRIANGLES, 3,3);
}
