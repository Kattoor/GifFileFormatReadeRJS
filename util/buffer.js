function Buffer(bytes) {

    bytes = new Int8Array(bytes);

    this.pointer = 0;

    this.readByte = function () {
        const b = bytes[this.pointer++];
        return b & 0xFF;
    };

    this.readWord = function () {
        const first = bytes[this.pointer++];
        const second = bytes[this.pointer++];
        return ((second << 8) | (first & 0xFF));
    };

    this.incrementPointer = function (incrementBy) {
        this.pointer += incrementBy;
    };

    this.getBytes = function () {
        return bytes;
    };

    this.getPointer = function () {
        return this.pointer;
    };
}
