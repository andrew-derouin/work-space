import { Item } from "../classes/Item";
import { items } from "../data/items";

export class ManageData {
    dataList: Array<Item>;

    constructor() {
        this.dataList = this.assembleData();
    }

    assembleData(): Array<Item> {
        let data: Array<Item> = [];
        items.forEach((item: any) => {
            data.push(new Item(item))
        });
        console.log(data)
        return data;
    }
}
