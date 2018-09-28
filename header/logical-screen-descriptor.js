function LogicalScreenDescriptor(packed) {

    this.globalColorTableSize = packed & 0b111;
    this.colorTableSortFlag = (packed & 0b1000) >> 3;
    this.colorResolution = (packed & 0b1110000) >> 4;
    this.globalColorTableFlag = (packed & 0b10000000) >> 7;
    this.amountOfColorTableEntries = 1 << (this.globalColorTableSize + 1);

    this.getGlobalColorTableSize = function() {
        return this.globalColorTableSize;
    };

    this.getColorTableSortFlag = function() {
        return this.colorTableSortFlag;
    };

    this.getColorResolution = function () {
        return this.colorResolution;
    };

    this.getGlobalColorTableFlag = function() {
        return this.globalColorTableFlag;
    };

    this.getAmountOfColorTableEntries = function() {
        return this.amountOfColorTableEntries;
    };
}
