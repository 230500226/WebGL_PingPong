showError("Hello Test error 1"); // global showError function

function helloPingPong(){

    const triangleGeoBuffer = createBuffer(verticesTriangle); // Calls the global createBuffer function
    const squareGeoBuffer = createBuffer(verticesSquare);

    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode, 'triangleShaderProgram');
    createShaderProgram(vertexShaderSourceCode, fragmentShaderSourceCode,'squareShaderProgram');

    const triangleVertAtribLoc = utilAttribLocation('triangleShaderProgram', 'vertexPosition');
    const squareVertAtribLoc = utilAttribLocation('squareShaderProgram','vertexPosition');

    // Need for setting pixel dimensions of the canvas to match display size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    function animate() {
        // Update any state or variables here

        // Clear the canvas
        gl.clearColor(0,0.1,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw your scene
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Set up and draw the triangle
        gl.useProgram(triangleShaderProgram);
        gl.enableVertexAttribArray(triangleVertAtribLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
        gl.vertexAttribPointer(triangleVertAtribLoc,2,gl.FLOAT,false,0,0);

            window.aspectRatio(triangleShaderProgram);

        gl.drawArrays(gl.TRIANGLES, 0,3);

        // Set up and draw the square
        gl.useProgram(squareShaderProgram);
        gl.enableVertexAttribArray(squareVertAtribLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareGeoBuffer);
        gl.vertexAttribPointer(squareVertAtribLoc,2,gl.FLOAT,false,0,0);

            window.aspectRatio(squareShaderProgram);

        gl.drawArrays(gl.TRIANGLE_FAN, 0,4); 

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
