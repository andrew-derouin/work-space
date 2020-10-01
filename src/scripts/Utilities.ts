export function setCssVar(varName: string, value: string): void {
    document.documentElement.style.setProperty(varName, value);
}

export function onResize(callback: Function): void {
   addEvent('resize', callback, 200);
}

export function addEvent(listener: string, callback:Function, delay: number = 10, context: string = 'all') {
    let wait: boolean = false;
    window.addEventListener(listener, function (e) {
        if (wait || (context !== 'all' && window.$App.currentPage.id !== context)) {
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

export function trigger(eventName: string, data: Object = {}) {
    var event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

export function flash(element?: HTMLElement, timer: number = 100): void {
    let el = element;
    if (!el) {
        el = document.getElementsByClassName('main-overlay')[0] as HTMLElement;
    }
    el.classList.add('flash');
    setTimeout(() => {
        el?.classList.remove('flash');
    }, timer);
}
