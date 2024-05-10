window.keyBindings = function(keyUp, keyDown, boolUp, boolDown) {
    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case keyUp:
                boolUp.value = true;
                break;
            case keyDown:
                boolDown.value = true;
                break;
        }
    });

    window.addEventListener('keyup', function(event) {
        switch (event.key) {
            case keyUp:
                boolUp.value = false;
                break;
            case keyDown:
                boolDown.value = false;
                break;
        }
    });
}
