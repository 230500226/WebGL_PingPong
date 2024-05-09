showError("Hello Test error 1"); // global showError function

function helloPingPong(){

    // Creating buffers for the vertices in the vertex shader
    const redGeoBuffer = createBuffer(verticesRed);
    const blueGeoBuffer = createBuffer(verticesBlue);
    const fourGeoBuffer = createBuffer(verticesFour);

    // Creating shader programs for each shape
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'redShaderProgram');
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'blueShaderProgram');
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'fourShaderProgram');

    // Getting the locations of the attributes for each shape
    const redVertAtribLoc = utilAttribLocation('redShaderProgram','vertexPosition');
    const blueVertAtribLoc = utilAttribLocation('blueShaderProgram','vertexPosition');
    const fourVertAtribLoc = utilAttribLocation('fourShaderProgram','vertexPosition');


    // Setting up textures
    createBuffer(verticesRedTex);
    const texCoordRedAtribLoc = utilAttribLocation('redShaderProgram', 'vertTexCoord');
    gl.vertexAttribPointer(texCoordRedAtribLoc,2,gl.FLOAT,false,0,0);

    // create texture for each shape
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
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Set up and draw the red
        gl.useProgram(redShaderProgram);
        gl.enableVertexAttribArray(redVertAtribLoc);
        
        gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, redGeoBuffer);
        gl.vertexAttribPointer(redVertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(redShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, redTexture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLES, 0,3); 
        gl.drawArrays(gl.TRIANGLES, 3,3); 

        // Set up and draw the blue
        gl.useProgram(blueShaderProgram);
        gl.enableVertexAttribArray(blueVertAtribLoc);
        
        //gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, blueGeoBuffer);
        gl.vertexAttribPointer(blueVertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(blueShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, blueTexture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawArrays(gl.TRIANGLES, 0,3); 
        gl.drawArrays(gl.TRIANGLES, 3,3); 

        // Set up and draw the four
        gl.useProgram(fourShaderProgram);
        gl.enableVertexAttribArray(fourVertAtribLoc);
        
        //gl.enableVertexAttribArray(texCoordRedAtribLoc);

        gl.bindBuffer(gl.ARRAY_BUFFER, fourGeoBuffer);
        gl.vertexAttribPointer(fourVertAtribLoc,2,gl.FLOAT,false,0,0);
        window.aspectRatio(fourShaderProgram);

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
