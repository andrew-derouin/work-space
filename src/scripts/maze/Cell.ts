import { Neighbors } from "./INeighbors";
import { Distances } from "./Distances";
import * as ut from "../Utilities";

export class Cell {
    index: number;
    position: Array<number>;
    additionalClass: string;
    neighbors: Neighbors;
    links: Neighbors;
    path: Array<string>;
    directions: Array<string>;
    distances?: Distances;
    displayDistance: number;
    weight: number;
    template: string;
    classList?: string;

    constructor(position: Array<number>, index: number) {
        this.index = index;
        this.position = position;
        this.additionalClass = "";
        this.neighbors = {};
        this.links = {};
        this.path = [];
        this.directions = ["north", "south", "east", "west"];
        this.distances;
        this.displayDistance = 0;
        this.weight = Math.floor(Math.random() * 500);
        this.template = this.getTemplate();
    }

    getClassList() {
        let directions = this.path;
        let string = "";
        for (let i = 0; i < directions.length; i++) {
            string += " " + directions[i];
        }
        return string;
    }

    getTemplate() {
        return `<div class="cell${this.classList} ${
            this.additionalClass
        } ${this.position
            .toString()
            .replace(
                ",",
                "-"
            )} hidden"><span class="number hidden" data-number="${
            this.displayDistance
        }"></span><span class="filter"></span></div>`;
    }

    setNeighbors(positions: Array<Array<number>>, cells: Array<Cell>) {
        let neighbors: Neighbors = {};

        let north = [this.position[0] - 1, this.position[1]];
        let east = [this.position[0], this.position[1] + 1];
        let south = [this.position[0] + 1, this.position[1]];
        let west = [this.position[0], this.position[1] - 1];

        neighbors.north = cells[ut.deepIndexOf(positions, north)]
            ? cells[ut.deepIndexOf(positions, north)]
            : undefined;
        neighbors.east = cells[ut.deepIndexOf(positions, east)]
            ? cells[ut.deepIndexOf(positions, east)]
            : undefined;
        neighbors.south = cells[ut.deepIndexOf(positions, south)]
            ? cells[ut.deepIndexOf(positions, south)]
            : undefined;
        neighbors.west = cells[ut.deepIndexOf(positions, west)]
            ? cells[ut.deepIndexOf(positions, west)]
            : undefined;

        this.neighbors = neighbors;
    }

    setWall(axis: number, extent: number, additionalClass: string) {
        if (this.position[axis] === extent) {
            this.additionalClass += additionalClass;
        }
    }

    setDirections(height: number, width: number) {
        this.additionalClass = "";
        this.setWall(0, 0, " north-wall");
        this.setWall(0, height - 1, " south-wall");
        this.setWall(1, 0, " west-wall");
        this.setWall(1, width - 1, " east-wall");
    }

    updateCell() {
        this.classList = this.getClassList();
        this.template = this.getTemplate();
    }

    setLink(direction: string, oppositeDirection: string) {
        if (this.neighbors[direction]) {
            if (
                this.neighbors[direction].path.indexOf(oppositeDirection) >
                    -1 ||
                this.path.indexOf(direction) > -1
            ) {
                this.links[direction] = true;
                return;
            }
        }
        this.links[direction] = false;
    }

    setLinks() {
        this.setLink("north", "south");
        this.setLink("west", "east");
        this.setLink("east", "west");
        this.setLink("south", "north");
    }

    prevListHelper(direction: string) {
        let prevList: Array<Cell> = [];
        let neighbor: Cell | undefined | null = this.neighbors.west;

        while (neighbor) {
            if (
                neighbor.path.indexOf("south") > -1 ||
                neighbor.path.indexOf("east") < 0
            ) {
                neighbor = null;
                return prevList;
            }
            if (neighbor.neighbors.south) {
                prevList.push(neighbor);
            }
            neighbor = neighbor.neighbors.west;
        }
        return prevList;
    }

    setDistances(cells: Array<Cell>) {
        this.distances = new Distances(this);
        let distance = 0;
        let frontier: Array<Cell> = [this];
        let visited: Array<Number> = [this.index];

        while (frontier.length > 0) {
            let newFrontier: Array<Cell> = [];

            distance += 1;

            frontier.forEach((side: Cell) => {
                Object.keys(side.links).forEach((link) => {
                    if (!this.distances) {
                        this.distances = new Distances(this);
                    }

                    if (
                        side.neighbors[link] &&
                        side.links[link] &&
                        !visited.includes(side.neighbors[link].index)
                    ) {
                        newFrontier.push(side.neighbors[link]);
                        cells[
                            side.neighbors[link].index
                        ].displayDistance = distance;
                        this.distances.cells.push(side.neighbors[link]);
                        this.distances.cellsDistance.push(distance);
                        visited.push(side.neighbors[link].index);
                    }
                });
            });

            frontier = newFrontier;
        }
    }
}
