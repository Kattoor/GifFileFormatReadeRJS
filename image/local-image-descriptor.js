function LocalImageDescriptor(data) {

    this.left = data.readWord();
    this.top = data.readWord();
    this.width = data.readWord();
    this.height = data.readWord();
    this.packed = data.readByte();
    this.localColorTableFlag = this.packed & 0b1;
    this.interlaceFlag = (this.packed & 0b10) >> 1;
    this.sortFlag = (this.packed & 0b100) >> 2;
    this.reserved = (this.packed & 0b11000) >> 3;
    this.sizeOfLocalTableEntry = (this.packed & 0b11100000) >> 5;
    this.amountOfColorTableEntries = this.localColorTableFlag === 1 ? 1 << (this.sizeOfLocalTableEntry + 1) : 0;

    this.getLeft = function() {
        return this.left;
    };

    this.getTop = function() {
        return this.top;
    };

    this.getWidth = function() {
        return this.width;
    };

    this.getHeight = function() {
        return this.height;
    };

    this.getPacked = function() {
        return this.packed;
    };

    this.getLocalColorTableFlag = function() {
        return this.localColorTableFlag;
    };

    this.getInterlaceFlag = function() {
        return this.interlaceFlag;
    };

    this.getSortFlag = function() {
        return this.sortFlag;
    };

    this.getReserved = function() {
        return this.reserved;
    };

    this.getSizeOfLocalTableEntry = function() {
        return this.sizeOfLocalTableEntry;
    };

    this.getAmountOfColorTableEntries = function() {
        return this.amountOfColorTableEntries;
    };
}
