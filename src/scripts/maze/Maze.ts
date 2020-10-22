import { Grid } from "./Grid";
import { Visualizer } from "./Visualizer";

export class Maze {
  width: number;
  height: number;
  grid: Grid;
  visualizer: Visualizer;
  element: HTMLElement;

  constructor(algorithmName: string) {
    this.element = document.querySelector('.maze-board .grid') as HTMLElement;
    this.width = 15;
    this.height = 10;
    this.grid = new Grid(this.width, this.height, algorithmName);
    console.log(this.grid);
    this.visualizer = new Visualizer(this.grid);
    this.createVisualizer();
  }

  createVisualizer(): void {
    this.visualizer.createDivs();
    this.visualizer.fadeInGrid();
  }
}