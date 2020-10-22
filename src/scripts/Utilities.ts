export function setCssVar(varName: string, value: string): void {
    document.documentElement.style.setProperty(varName, value);
}

export function onResize(callback: Function): void {
    addEvent("resize", callback, 200);
}

export function addEvent(
    listener: string,
    callback: Function,
    delay: number = 10,
    context: string = "all"
) {
    let wait: boolean = false;
    window.addEventListener(listener, function(e) {
        if (
            wait ||
            (context !== "all" && window.$App.currentPage.id !== context)
        ) {
            return;
        } else {
            wait = true;
            callback(e);
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

export function animationTiming(
    elementClass: string,
    start: Function,
    end: Function
) {
    var element: HTMLElement = document.getElementsByClassName(
        elementClass
    )[0] as HTMLElement;
    element.addEventListener("animationstart", start());
    element.addEventListener("animationend", end());
}

export function shuffle(array: Array<any>) {
    var newArray: Array<any> = Array.from(array);
    var i = newArray.length - 1;

    while (newArray[i]) {
        var n = Math.floor(Math.random() * i);
        var oldValue = newArray[i];
        newArray[i] = newArray[n];
        newArray[n] = oldValue;
        i--;
    }
    return newArray;
}

export function between(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function flip(percentage = 0.5) {
    return Math.random() < percentage;
}

export function deepIndexOf(array: Array<any>, item: Array<any>) {
    for (var i = 0; i < array.length; i++) {
        var val = array[i];

        if (val[0] === item[0]) {
            if (val[1] === item[1]) {
                return i;
            }
        }
    }

    return -1;
}

export function pause(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("resolved");
        }, time);
    });
}
