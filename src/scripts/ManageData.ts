import { Item } from "../classes/Item";
import { Page } from "../classes/Page";
import { items } from "../data/items";

export class ManageData {
    dataList: Array<Item>;
    pages: Array<Page>

    constructor() {
        this.dataList = this.assembleData();
        this.pages = [
            new Page('about', 'About Page'), 
            new Page('slideshow', 'Old Games'),
            new Page('tiles', 'Tile Page')];
    }

    assembleData(): Array<Item> {
        let data: Array<Item> = [];
        items.forEach((item: any) => {
            data.push(new Item(item))
        });
        return data;
    }

    findPage(id: string): Page {
        let foundPage = new Page(id, 'Not a real Page')
        this.pages.forEach((page: Page) => {
            if (page.id === id) {
                foundPage = page;
            } 
        });

        return foundPage;
    }
}
