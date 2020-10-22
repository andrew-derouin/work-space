import { Cell } from "./Cell";

export interface Neighbor {
    cell: Cell;
    direction: string;
    neighbor: Cell;
}
