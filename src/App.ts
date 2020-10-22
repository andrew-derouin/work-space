import { Item } from "./classes/Item";
import { Page } from "./classes/Page";
import { Controls } from "./scripts/Controls";
import { ManageData } from "./scripts/ManageData";
import * as ut from "./scripts/Utilities";

export enum Breakpoint {
    xs = 575.98,
    sm = 767.98,
    md = 991.98,
    lg = 1199.98
}

export class App {
    MainData: ManageData;
    Controls: Controls;
    isActive: boolean;
    mainItem: Item;
    currentPage: Page;

    constructor() {
        this.MainData = new ManageData();
        this.Controls = new Controls();
        this.isActive = false;
        this.mainItem = this.MainData.dataList[0];
        this.currentPage = this.MainData.findPage('maze');
    }

    setActiveFor(timer: number) {
        this.isActive = true;
        setTimeout(() => {
            this.isActive = false;
        }, timer);
    }

    setCurrentPage(page: string | Page) {
        if (typeof page === 'string') {
            this.currentPage = this.MainData.findPage(page);
        } else {
            this.currentPage = page;
        }
    }

    setMainItem(item: Item) {
        this.mainItem = item;
        ut.trigger('main-item-change');
    }
}
