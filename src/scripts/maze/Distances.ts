import { Cell } from "./Cell";

export class Distances {
  root: Cell;
  cells: Array<Cell>;
  cellsDistance: Array<number>;
  
  constructor(root: Cell) {
    this.root = root;
    this.cells = [this.root];
    this.cellsDistance = [0];
  }
}
