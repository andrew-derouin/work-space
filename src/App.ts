import { Item } from "./classes/Item";
import { Controls } from "./scripts/Controls";
import { ManageData } from "./scripts/ManageData";
import * as ut from "./scripts/Utilities";


export class App {
    MainData: ManageData;
    Controls: Controls;
    isActive: boolean;
    mainItem: Item;

    constructor() {
        this.MainData = new ManageData();
        this.Controls = new Controls();
        this.isActive = false;
        this.mainItem = this.MainData.dataList[0];
    }

    setActiveFor(timer: number) {
        this.isActive = true;
        setTimeout(() => {
            this.isActive = false;
        }, timer);
    }

    setMainItem(item: Item) {
        this.mainItem = item;
        ut.trigger('main-item-change');
    }
}
