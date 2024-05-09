showError("Hello Test error 1"); // global showError function

function helloPingPong(){

    const squareGeoBuffer = createBuffer(verticesSquare);
    const square2GeoBuffer = createBuffer(verticesSquare2);
    const square3GeoBuffer = createBuffer(verticesSquare3);
    createBuffer(verticesRedTex);

    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'squareShaderProgram');
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'square2ShaderProgram');
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'square3ShaderProgram');

    const squareVertAtribLoc = utilAttribLocation('squareShaderProgram','vertexPosition');
    const square2VertAtribLoc = utilAttribLocation('square2ShaderProgram','vertexPosition');
    const square3VertAtribLoc = utilAttribLocation('square3ShaderProgram','vertexPosition');

    const texCoordRedAtribLoc = utilAttribLocation('squareShaderProgram', 'vertTexCoord');


    gl.vertexAttribPointer(texCoordRedAtribLoc,2,gl.FLOAT,false,0,0);

    const redTexture = window.createTexture('redCard');
    const blueTexture = window.createTexture('blueCard');
    const fourTexture = window.createTexture('fourCard');

    // Need for setting pixel dimensions of the canvas to match display size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    function animate() {
        // Update any state or variables here

        // Clear the canvas
        gl.clearColor(0, 0.1, 0,0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw your scene
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Set up and draw the square
        gl.useProgram(squareShaderProgram);
        gl.enableVertexAttribArray(squareVertAtribLoc);
        
        gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareGeoBuffer);
        gl.vertexAttribPointer(squareVertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(squareShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, redTexture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLES, 0,3); 
        gl.drawArrays(gl.TRIANGLES, 3,3); 

        // Set up and draw the square2
        gl.useProgram(square2ShaderProgram);
        gl.enableVertexAttribArray(square2VertAtribLoc);
        
        //gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, square2GeoBuffer);
        gl.vertexAttribPointer(square2VertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(square2ShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, blueTexture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLES, 0,3); 
        gl.drawArrays(gl.TRIANGLES, 3,3); 

        // Set up and draw the square3
        gl.useProgram(square3ShaderProgram);
        gl.enableVertexAttribArray(square3VertAtribLoc);
        
        //gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, square3GeoBuffer);
        gl.vertexAttribPointer(square3VertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(square3ShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, fourTexture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLES, 0,3); 
        gl.drawArrays(gl.TRIANGLES, 3,3); 
        // Request the next frame
        //requestAnimationFrame(animate);
    }
    animate();
}

try {
    helloPingPong();
} catch (e) {
    showError(`Uncaught JavaScript exception: ${e}`);
}
