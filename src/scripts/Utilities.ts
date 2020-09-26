
export function setCssVar(varName: string, value: string): void {
    document.documentElement.style.setProperty(varName, value);
}

export function onResize(callback: Function): void {
   debounceEventListener(200, 'resize', callback);
}

export function debounceEventListener(delay: number, listener: string, callback: Function) {
    let wait: boolean = false;
    window.addEventListener(listener, function (e) {
        if (wait) {
            return;
        } else {
            wait = true;
            callback(e)
        }

        setTimeout(function() {
            wait = false;
        }, delay);
    });
}

export function trigger(eventName: string) {
    var event = new Event(eventName);
    window.dispatchEvent(event);
}
