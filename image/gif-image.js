function GifImage(data, backgroundColorIndex, graphicControlExtension, dictionary) {

    this.localImageDescriptor = new LocalImageDescriptor(data);
    this.localColorTable = new LocalColorTable(data, this.localImageDescriptor.getAmountOfColorTableEntries());
    this.imageData = new GifImageData(data, this.localImageDescriptor.getWidth(), this.localImageDescriptor.getHeight(), backgroundColorIndex, graphicControlExtension, dictionary);

    this.getLocalImageDescriptor = function() {
        return this.localImageDescriptor;
    };

    this.getLocalColorTable = function() {
        return this.localColorTable;
    };

    this.getImageData = function() {
        return this.imageData;
    };
}
