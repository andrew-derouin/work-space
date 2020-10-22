import { Algorithm } from "./Algorithm";
import { Cell } from "./Cell";
import * as ut from "../Utilities";

export class Grid {
  cells: Array<Cell>;
  height: number;
  width: number;
  template: string;
  positions: Array<Array<number>>;
  algorithm: string;

  constructor(width: number, height: number, algorithm: string) {
    this.cells = [];
    this.height = height;
    this.width = width;
    this.template = ``;
    this.positions = [];
    this.algorithm = algorithm;
  }

  getGridTemplate(): string {
    var innerTemplate = '';
    this.setPositions();
    this.positions.forEach((val, i) => this.addCell(i));

    this.updateCells();

    this.cells.forEach((cell) => {
      innerTemplate += cell.template;
    });

    return innerTemplate;
  }

  setPositions(): void {
    for (var i = 0; i < this.height; i++) {
      var heightPosition = i;
      for (var n = 0; n < this.width; n++) {
        this.positions.push([heightPosition, n]);
      }
    }
  }

  addCell(index: number): void {
    var newCell = new Cell(
      this.positions[index],
      index);

    this.cells.push(newCell);
  }

  updateCells(type = 'top-left'): void {
    var cells = this.cells;
    if (this.algorithm === 'prims') {
      cells = ut.shuffle(cells);
    }

    cells.forEach((cell) => {
      cell.setNeighbors(this.positions, this.cells);
      cell.setDirections(this.height, this.width);
      this.runCellAlgorithm(cell);
    });

    this.runCellsAlgorithm(cells);

    cells.forEach((cell) => {
      cell.setLinks();
    });

    var cellNumber = Math.floor(Math.random() * this.cells.length);
    this.cells[cellNumber].setDistances(this.cells);

    cells.forEach((cell) => {
      cell.updateCell();
    });
  }

  runCellAlgorithm(cell: Cell): void {
    if (this.algorithm !== 'prim') {
      cell = new Algorithm()[this.algorithm](cell);
    }
  }

  runCellsAlgorithm(cells: Array<Cell>): void {
    if (this.algorithm === 'prim') {
      cells = new Algorithm()[this.algorithm](cells);
    }
  }
}
