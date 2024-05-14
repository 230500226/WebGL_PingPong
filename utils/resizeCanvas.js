window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    var canvas = document.getElementById('IDcanvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var canvasRatio = 16 / 9; // Aspect ratio of the canvas

    if (windowRatio < canvasRatio) {
        // Height is the limiting factor
        var canvasHeight = Math.max(windowHeight * 0.7, 400);
        var canvasWidth = canvasHeight * canvasRatio;
    } else {
        // Width is the limiting factor
        var canvasWidth = windowWidth * 0.7;
        var canvasHeight = canvasWidth / canvasRatio;
    }

    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    //center the canvas
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
}

// Call the function initially to set the canvas size
resizeCanvas();
