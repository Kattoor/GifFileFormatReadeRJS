function ExtensionInformation(data) {

    this.extension = null;

    this.extensionClassificationByte = data.readByte();
    switch (this.extensionClassificationByte) {
        case 0xF9:
            this.extension = new GraphicControlExtension(data);
            break;
        case 0xFF:
            this.extension = new ApplicationExtension(data);
            break;
        default:
            this.extension = null;
            break;
    }

    this.getExtension = function() {
        return this.extension;
    };
}
