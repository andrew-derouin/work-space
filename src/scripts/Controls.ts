import * as ut from "./Utilities";

export class Controls {
    constructor() {
        this.readDirections();
        this.readWheel();
    }

    readDirections() {
        document.onkeyup = function(e) {
            console.log(e.key);
            switch(e.key) {
                case "ArrowLeft": // left
                var event = new Event('ArrowLeft');
                window.dispatchEvent(event);
                break;
        
                case "ArrowUp": // up
                var event = new Event('ArrowUp');
                window.dispatchEvent(event);
                break;
        
                case "ArrowRight": // right
                var event = new Event('ArrowRight');
                window.dispatchEvent(event);
                break;
        
                case "ArrowDown": // down
                var event = new Event('ArrowDown');
                window.dispatchEvent(event);
                break;
        
                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action (scroll / move caret)
        };
    }

    readWheel() {
        ut.debounceEventListener(1000, 'wheel', (e: WheelEvent) => {
            if (e.deltaX > 0) {
                var event = new Event('ArrowRight');
                window.dispatchEvent(event);
            } else {
                var event = new Event('ArrowLeft');
                window.dispatchEvent(event);
            }
        });
    }

    readTouch() {
        window.addEventListener('touchend', function (e) {

        });
    }
}
