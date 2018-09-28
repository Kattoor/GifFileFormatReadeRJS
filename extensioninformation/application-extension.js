function ApplicationExtension(data) {

    this.blockSize = data.readByte();
    this.identifier = [data.readByte(), data.readByte(), data.readByte(), data.readByte(), data.readByte(), data.readByte(), data.readByte(), data.readByte()];
    this.authCode = [data.readByte(), data.readByte(), data.readByte()];
    this.applicationDataSize = data.readByte();
    this.lastSubBlockReached = this.applicationDataSize === 0;
    while (!(this.lastSubBlockReached)) {
        for (let i = 0; i < this.applicationDataSize; i++)
            data.readByte();
        this.applicationDataSize = data.readByte();
        this.lastSubBlockReached = this.applicationDataSize === 0;
    }

    this.getIdentifier = function() {
        return this.identifier;
    };

    this.getAuthCode = function() {
        return this.authCode;
    };
}
