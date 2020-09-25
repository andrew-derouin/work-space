const ImageTypes: any = {
    'standard': ['c-01', 's-01', 's-02']
}

export class Item {
    jsonItem: JSON;
    id: string;
    name: string;
    description: string;
    type: string;
    imageTypes: Array<string>
    images: Array<string>;
    primaryColor: string;
    secondaryColor: string;

    constructor(jsonItem: any) {
        this.jsonItem = jsonItem;
        this.id = jsonItem.id;
        this.name = jsonItem.name;
        this.description = jsonItem.description;
        this.type = 'standard';
        this.imageTypes = ImageTypes[this.type];
        this.images = this.createImagePaths();
        this.primaryColor = jsonItem.primaryColor;
        this.secondaryColor = jsonItem.secondaryColor;
    }

    createImagePaths(): Array<string> {
        let images: Array<string> = [];
        this.imageTypes.forEach((type) => {
            images.push(`./src/data/${this.id}/${type}.jpg`);
        });

        return images;
    }
}
