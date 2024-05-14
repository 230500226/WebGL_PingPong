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

    // Initialize red translation
    const uMatrixRed = utilUniformLocation(redShaderProgram, 'u_matrix');
    var leftRed = false, rightRed = false;
    var yRed = 0, xRed = 0;
    // keybindings for red
    var upRed = {value: false}, downRed = {value: false};
    window.keyBindings('ArrowUp', 'ArrowDown', upRed, downRed);

    // Initialize blue translation
    const uMatrixBlue = utilUniformLocation(blueShaderProgram, 'u_matrix');
    var upBlue = false, downBlue = false, leftBlue = false, rightBlue = false;
    window.yBlue = 0; window.xBlue = 0;
    // keybindings for blue
    var upBlue = {value: false}, downBlue = {value: false};
    window.keyBindings('w', 's', upBlue, downBlue);

    // Initialize four translation
    const uMatrixFour = utilUniformLocation(fourShaderProgram, 'u_matrix');
    var upFour = false, downFour = false, leftFour = false, rightFour = false;
    var yFour = 0, xFour = 0;
    window.fourShape = {x: 0, y: 0, up: false, down: false, left: false, right: false};

    function animate() {
        // Clear the canvas
        gl.clearColor(0, 0.1, 0,0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Draw red
        var position = matrixTranslate(redShaderProgram, uMatrixRed, upRed, downRed, leftRed, rightRed, xRed, yRed);
        xRed = position.x;
        yRed = position.y;
        draw(redShaderProgram, redVertAtribLoc, redGeoBuffer, texCoordRedAtribLoc, redTexture);

        // Draw blue
        var position = matrixTranslate(blueShaderProgram, uMatrixBlue, upBlue, downBlue, leftBlue, rightBlue, xBlue, yBlue);
        xBlue = position.x;
        yBlue = position.y;
        draw(blueShaderProgram, blueVertAtribLoc, blueGeoBuffer, null, blueTexture);

        // Draw four
        gl.useProgram(fourShaderProgram);
        fourShape = window.bounce(fourShape, 0.9, {x: xRed, y: yRed}, {x: xBlue, y: yBlue});
        var translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            fourShape.x, fourShape.y, 0, 1
        ];
        gl.uniformMatrix4fv(uMatrixFour, false, translationMatrix);
        draw(fourShaderProgram, fourVertAtribLoc, fourGeoBuffer, null, fourTexture);

        // Request the next frame
        requestAnimationFrame(animate);
    }
    animate();
}

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-div').style.display = 'none';
    var countdown = 3;
    var countdownDisplay = document.createElement('div');
    countdownDisplay.id = 'countdown';
    countdownDisplay.style.position = 'fixed';
    countdownDisplay.style.top = '50%';
    countdownDisplay.style.left = '50%';
    countdownDisplay.style.transform = 'translate(-50%, -50%)';
    countdownDisplay.style.fontSize = '50px';
    countdownDisplay.style.color = 'white';
    document.body.appendChild(countdownDisplay);

    var countdownInterval = setInterval(function() {
        if (countdown > 0) {
            countdownDisplay.textContent = countdown;
            countdown--;
        } else if (countdown === 0) {
            countdownDisplay.textContent = 'GO!';
            countdown--;
        } else {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownDisplay);
            try {
                helloPingPong();
            } catch (e) {
                showError(`Nah bro Uncaught JavaScript exception: ${e}`);
            }
        }
    }, 1000);
});
