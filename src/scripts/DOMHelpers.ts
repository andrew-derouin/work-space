import * as ut from "./Utilities";

export function flash(element?: HTMLElement, timer: number = 100): void {
    let el = element;
    if (!el) {
        el = document.getElementsByClassName("main-overlay")[0] as HTMLElement;
    }
    el.classList.add("flash");
    setTimeout(() => {
        el?.classList.remove("flash");
    }, timer);
}

export async function visualizeDistance() {
    var spans: Array<HTMLElement> = Array.from(
        document.querySelectorAll(".cell span")
    );
    spans = ut.shuffle(spans);
    var i = 0;
    while (spans[i]) {
        spans[i].innerHTML = spans[i].getAttribute("data-number") as string;
        spans[i].classList.remove("hidden");
        var result = await ut.pause(5);
        i++;
    }
    colorCodeDistance();
}

export function colorCodeDistance() {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell) {
        var filter: HTMLElement | null = cell.querySelector(".filter");
        var numberString: string | undefined = cell.querySelector("span")
            ?.dataset.number;
        var bgOpacity = 0.75;
        var bgColor = "127, 63, 191";

        if (numberString) {
            var number: number = parseInt(numberString);
            if (number != 0) {
                bgOpacity = (100 - number * 2) / 100;
            }

            if (bgOpacity < 0.8) {
                bgColor = "63, 63, 191";
            }
    
            if (bgOpacity < 0.5) {
                bgColor = "63, 191, 191";
            }
            
            if (filter) {
                filter.style.backgroundColor = `rgba(${bgColor}, ${bgOpacity})`;
    
                if (number === 0) {
                    filter.style.outline = "4px solid gold";
                    filter.style.outlineOffset = "-4px";
                    filter.style.backgroundColor = "silver";
                }
            }
        }
    });
}
