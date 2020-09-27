import * as ut from "./Utilities";

export class Controls {
    constructor() {
        this.readDirections();
        this.readWheel();
        this.readTouch();
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
        ut.addEvent('wheel', (e: WheelEvent) => {
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
        }, 800);
    }

    readTouch() {
        ut.addEvent('touchend', (e: TouchEvent) => {
            if (!window.$App.isActive) {
                if (e.changedTouches[0].clientX < 0) {
                    ut.trigger('ArrowRight');
                } else {
                    ut.trigger('ArrowLeft');
                }
            }
        }, 200);
    }
}
