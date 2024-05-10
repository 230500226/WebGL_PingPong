window.matrixTranslate = function (program, uMatrix, up, down, left, right, x, y){
    
    gl.useProgram(program);

    if (up.value && !down.value && y < 0.75){
        y += 0.08;
    } else if (!up.value && down.value && y > -0.75){
        y -= 0.08;
    };

    if (left.value && !right.value){
        x-=0.08;
    } else if (!left.value && right.value){
        x+=0.08;
    }

    var translationMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, 0, 1
    ];

    gl.uniformMatrix4fv(uMatrix, false, translationMatrix);

    return {x,y};

}
