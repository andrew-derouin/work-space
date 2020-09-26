import * as ut from "./Utilities";

export class Controls {
    constructor() {
        this.readDirections();
        this.readWheel();
    }

    readDirections() {
        document.onkeyup = function(e) {
            if (!window.$App.isActive) {
                switch(e.key) {
                    case "ArrowLeft":
                    ut.trigger('ArrowLeft');
                    break;
            
                    case "ArrowUp":
                    ut.trigger('ArrowUp');
                    break;
            
                    case "ArrowRight":
                    ut.trigger('ArrowRight');
                    break;
            
                    case "ArrowDown":
                    ut.trigger('ArrowDown');
                    break;
            
                    default: return;
                }
                e.preventDefault();
            }
        };
    }

    readWheel() {
        ut.debounceEventListener(1000, 'wheel', (e: WheelEvent) => {
            if (!window.$App.isActive) {
                if (e.deltaY !== 0) {
                    return;
                }

                if (e.deltaX > 0) {
                    ut.trigger('ArrowRight');
                } else {
                    ut.trigger('ArrowLeft');
                }
            }
        });
    }

    readTouch() {
        window.addEventListener('touchend', function (e) {

        });
    }
}
