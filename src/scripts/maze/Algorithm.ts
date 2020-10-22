import { Cell } from "./Cell";
import { Neighbor } from "./INeighbor";
import * as ut from "../Utilities";
import { IStringAccess } from "./IStringAccess";

export class Algorithm implements IStringAccess {
    [key: string]: any;
    
    constructor() {}

    binaryTree(cell: Cell): Cell {
        // Binary Tree for south and west
        if (ut.flip()) {
            if (cell.neighbors.east) {
                cell.path.push("east");
            } else if (cell.neighbors.south) {
                cell.path.push("south");
            }
        } else {
            if (cell.neighbors.south) {
                cell.path.push("south");
            } else if (cell.neighbors.east) {
                cell.path.push("east");
            }
        }

        return cell;
    }

    sidewinder(cell: Cell) {
        if (cell.neighbors.east && !cell.neighbors.south) {
            cell.path.push("east");
            return;
        }

        if (!cell.neighbors.east && !cell.neighbors.south) {
            return;
        }

        if (ut.flip() && cell.neighbors.east) {
            cell.path.push("east");
        } else {
            let prevList = cell.prevListHelper("south");
            if (prevList && prevList.length > 0) {
                let randomIndex = Math.floor(Math.random() * prevList.length);
                prevList[randomIndex].path.push("south");
                prevList[randomIndex].updateCell();
            } else if (cell.neighbors.east) {
                cell.path.push("east");
            } else {
                cell.path.push("south");
            }
        }

        return cell;
    }

    prim(cells: Array<Cell>): Array<Cell> {
        let active: Array<Cell> = [];
        let pastCells: Array<number> = [];
        let directions = ["north", "east", "south", "west"];

        active.push(cells[Math.floor(Math.random() * cells.length)]);
        while (active.length > 0) {
            let availableNeghbors: Array<Neighbor> = [];
            active.forEach((cell, i) => {
                directions.forEach((direction) => {
                    if (
                        cell.neighbors[direction] &&
                        !pastCells.includes(cell.neighbors[direction].index)
                    ) {
                        let newNeighbor: Neighbor = {
                            cell: cell,
                            direction: direction,
                            neighbor: cell.neighbors[direction],
                        };
                        availableNeghbors.push(newNeighbor);
                    }
                });
            });

            if (availableNeghbors.length < 1) {
                active = [];
            } else {
                let lowestWeightNeighbor: Neighbor = availableNeghbors[0];
                availableNeghbors.forEach((neighbor, i) => {
                    if (availableNeghbors[i + 1]) {
                        if (
                            neighbor.neighbor.weight >=
                            availableNeghbors[i + 1].neighbor.weight
                        ) {
                            lowestWeightNeighbor = availableNeghbors[i + 1];
                        } else {
                            lowestWeightNeighbor = neighbor;
                        }
                    }
                });

                pastCells.push(lowestWeightNeighbor.neighbor.index);

                if (lowestWeightNeighbor.direction === "north") {
                    lowestWeightNeighbor.neighbor.path.push("south");
                } else if (lowestWeightNeighbor.direction === "west") {
                    lowestWeightNeighbor.neighbor.path.push("east");
                } else {
                    lowestWeightNeighbor.cell.path.push(
                        lowestWeightNeighbor.direction
                    );
                }

                active.push(lowestWeightNeighbor.neighbor);
            }
        }
        return cells;
    }

    random(cell: Cell) {
        cell.directions.forEach((value) => {
            if (value === "east" && !cell.neighbors.east) {
                return;
            }

            if (value === "south" && !cell.neighbors.south) {
                return;
            }

            if (ut.flip()) {
                cell.path.push(value);
                return cell;
            }
        });
    }
}
