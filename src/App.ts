import { Controls } from "./scripts/Controls";
import { ManageData } from "./scripts/ManageData";


export class App {
    MainData: ManageData;
    Controls: Controls;

    constructor() {
        this.MainData = new ManageData();
        this.Controls = new Controls();
    }
}
