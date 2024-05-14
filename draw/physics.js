window.bounce = function(shape, boundary, redShape, blueShape) {
    // Initialize direction 
    if (shape.direction === undefined) {
        shape.direction = {x: Math.random() < 0.5 ? -1 : 1, y: Math.random() < 0.5 ? -1 : 1};
 shape.lastBounce = Date.now();
    }    
    // Initialize speed factor
    if (shape.speedFactor === undefined) {
        shape.speedFactor = 1;
    }

    // Move the shape
    shape.x += 0.009 * shape.direction.x * shape.speedFactor;
    shape.y += 0.009 * shape.direction.y * shape.speedFactor;

    // Increase speed factor over time
    shape.speedFactor += 0.001;

    // Check for collision with boundary
    if (shape.y < -boundary || shape.y > boundary) {
        shape.y = shape.y < -boundary ? -boundary : boundary;
        shape.direction.y *= -1; // Reverse y direction
    }

    // Check for collision with red and blue shapes
    window.redTop = redShape.y + 0.3; // Top of red shape
    window.redBottom = redShape.y - 0.3; // Bottom of red shape
    window.blueTop = blueShape.y + 0.3; // Top of blue shape
    window.blueBottom = blueShape.y - 0.3; // Bottom of blue shape

    var tolerance = 0.01; // Adjust this value as needed
    if (Math.abs(shape.x - (0.8)) < tolerance && shape.y <= redTop && shape.y >= redBottom) {
        shape.direction.x *= -1; // Reverse x direction
    }
if (Math.abs(shape.x - (-0.8)) < tolerance && shape.y <= blueTop && shape.y >= blueBottom) {
    shape.direction.x *= -1; // Reverse x direction
}

    // Check for game over condition
    if (shape.x < -boundary - 1) {
        // Red scores a point
        var redScore = document.getElementById('red-score');
        redScore.textContent = parseInt(redScore.textContent) + 1;
        document.getElementById('start-div').style.display = 'flex';
        shape.speedFactor = 1;
        return;
    } else if (shape.x > boundary + 1) {
        // Blue scores a point
        var blueScore = document.getElementById('blue-score');
        blueScore.textContent = parseInt(blueScore.textContent) + 1;
        document.getElementById('start-div').style.display = 'flex';
        shape.speedFactor = 1;
        return;
    }

    return shape;
}
