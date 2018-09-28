function GraphicControlExtension(data) {

    this.blockSize = data.readByte();
    this.packed = data.readByte();
    this.transparentColorFlag = this.packed & 0b1;
    this.userInputFlag = (this.packed & 0b10) >> 1;
    this.disposalMethod = (this.packed & 0b11100) >> 2;
    this.reserved = (this.packed & 0b11100000) >> 5;
    this.delayTime = data.readWord();
    this.transparentColorIndex = data.readByte();
    this.terminator = data.readByte();

    this.getBlockSize = function() {
        return this.blockSize;
    };

    this.getPacked = function() {
        return this.packed;
    };

    this.getTransparentColorFlag = function() {
        return this.transparentColorFlag;
    };

    this.getUserInputFlag = function() {
        return this.userInputFlag;
    };

    this.getDisposalMethod = function() {
        return this.disposalMethod;
    };

    this.getReserved = function() {
        return this.reserved;
    };

    this.getDelayTime = function() {
        return this.delayTime;
    };

    this.getTransparentcolorIndex = function() {
        return this.transparentColorIndex;
    };

    this.getTerminator = function() {
        return this.terminator;
    };
}
