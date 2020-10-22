import { Cell } from "./Cell";
import { IStringAccess } from "./IStringAccess";

export interface Neighbors extends IStringAccess {
    north?: Cell;
    east?: Cell;
    south?: Cell;
    west?: Cell;
}
