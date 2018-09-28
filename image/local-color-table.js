function LocalColorTable(data, amountOfColorTableEntries) {

    this.localColorTable = [];

    for (let i = 0; i < amountOfColorTableEntries; i++) {
        const red = data.readByte();
        const green = data.readByte();
        const blue = data.readByte();
        this.localColorTable[i] = [red, green, blue];
    }

    this.getLocalColorTable = function() {
        return this.localColorTable;
    };
}
