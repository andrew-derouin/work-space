const ImageTypes: any = {
    'standard': ['c-01', 's-01', 's-02', 's-03', 's-04']
}

export class Item {
    jsonItem: JSON;
    id: string;
    name: string;
    description: string;
    releaseDate: string;
    publisher: string;
    type: string;
    imageTypes: Array<string>
    images: Array<string>;
    coverImage: string;
    primaryColor: string;
    secondaryColor: string;
    url: string;

    constructor(jsonItem: any) {
        this.jsonItem = jsonItem;
        this.id = jsonItem.id;
        this.name = jsonItem.name;
        this.description = jsonItem.description;
        this.releaseDate = jsonItem.releaseDate;
        this.publisher = jsonItem.publisher;
        this.type = 'standard';
        this.imageTypes = ImageTypes[this.type];
        this.coverImage = this.imageTypes[0];
        this.images = this.createImagePaths();
        this.primaryColor = jsonItem.primaryColor;
        this.secondaryColor = jsonItem.secondaryColor;
        this.url = jsonItem.url;
    }

    createImagePaths(): Array<string> {
        let images: Array<string> = [];
        this.imageTypes.forEach((type) => {
            images.push(`./src/data/${this.id}/${type}.jpg`);
        });

        return images;
    }
}
