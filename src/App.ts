import { Utilities } from "./scripts/Utilities";
import { ManageData } from "./scripts/ManageData";


export class App {
    Utilities: Utilities;
    MainData: ManageData;

    constructor() {
        this.Utilities = new Utilities();
        this.MainData = new ManageData();
    }
}
