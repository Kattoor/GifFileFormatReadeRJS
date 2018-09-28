function GifHeader(data) {

    this.header = new Header(data);
    this.logicalScreenDescriptor = new LogicalScreenDescriptor(this.header.getPacked());
    this.globalColorTable = new GlobalColorTable(data, this.logicalScreenDescriptor.getAmountOfColorTableEntries());

    this.getDictionary = function() {
        return this.globalColorTable.getDictionary();
    };

    this.getData = function() {
        return data;
    };

    this.getHeader = function() {
        return this.header;
    };

    this.getLogicalScreenDescriptor = function() {
        return this.logicalScreenDescriptor;
    };

    this.getGlobalColorTable = function() {
        return this.globalColorTable;
    };
}
