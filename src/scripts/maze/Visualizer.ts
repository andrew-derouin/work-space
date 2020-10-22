import { Grid } from "./Grid";
import * as ut from "../Utilities";

export class Visualizer {
    canvas: HTMLElement;
    grid: Grid;
    width: number;

    constructor(grid: Grid) {
        this.canvas = document.querySelector(
            '.maze-board .grid'
        ) as HTMLElement;
        this.grid = grid;
        this.width = this.grid.width;
    }


    createDivs(): void {
        if (this.canvas) {
            var innerTemplate = this.grid.getGridTemplate();
            this.canvas.innerHTML = innerTemplate;
        }
    }

    async fadeInGrid(): Promise<any> {
        var cells: Array<Element> = (document.getElementsByClassName(
            "cell"
        ) as unknown) as Array<Element>;
        cells = ut.shuffle(cells);
        var i = 0;
        while (cells[i]) {
            cells[i].classList.remove("hidden");
            var result = await ut.pause(5);
            i++;
        }
    }

    // Canvas Based Visualization
    createCanvasDivs(): void {

    }
}
