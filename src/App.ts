import { Controls } from "./scripts/Controls";
import { ManageData } from "./scripts/ManageData";


export class App {
    MainData: ManageData;
    Controls: Controls;
    isActive: boolean;

    constructor() {
        this.MainData = new ManageData();
        this.Controls = new Controls();
        this.isActive = false;
    }

    setActiveFor(timer: number) {
        this.isActive = true;
        setTimeout(() => {
            this.isActive = false;
        }, timer);
    }
}
