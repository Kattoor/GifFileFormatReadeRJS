function Header(data) {

    this.screenWidth = data.readWord();
    this.screenHeight = data.readWord();
    this.packed = data.readByte();
    this.backgroundColor = data.readByte();
    this.aspectRatio = data.readByte();

    this.getScreenWidth = function() {
        return this.screenWidth;
    };

    this.getScreenHeight = function() {
        return this.screenHeight;
    };

    this.getPacked = function() {
        return this.packed;
    };

    this.getBackgroundColor = function() {
        return this.backgroundColor;
    };

    this.getAspectRatio = function() {
        return this.aspectRatio;
    };
}
