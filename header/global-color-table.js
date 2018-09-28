function GlobalColorTable(data, amountOfColorTableEntries) {

    this.dictionary = [];
    this.colorTable = [];

    for (let i = 0; i < amountOfColorTableEntries; i++) {
        const red = data.readByte();
        const green = data.readByte();
        const blue = data.readByte();
        this.colorTable[i] = [red, green, blue];
    }

    for (let i = 0; i < this.colorTable.length; i++) {
        let rgb = this.colorTable[i][0];
        rgb = (rgb << 8) + this.colorTable[i][1];
        rgb = (rgb << 8) + this.colorTable[i][2];
        this.dictionary.push([rgb]);
    }

    this.getColorTable = function() {
        return this.colorTable;
    };

    this.getDictionary = function() {
        return this.dictionary;
    };
}
