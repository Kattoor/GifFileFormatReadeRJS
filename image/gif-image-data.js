function GifImageData(data, width, height, backgroundColorIndex, graphicControlExtension, dictionary) {

    this.bufferedImage = {};

    readImageData(data);

    function readImageData(data) {
        let codeLength = data.readByte();
        let end = false;
        let bytes = [];
        do {
            let count = data.readByte();
            if (count === 0)
                end = true;
            else {
                for (let i = 0; i < count; i++)
                    bytes.push(data.readByte());
            }
        } while (!end);

        let decompressed = [...decompress(bytes, codeLength, dictionary)];

        //this.bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (y * width + x < decompressed.length) {
                    let i = decompressed[y * width + x];
                    if (graphicControlExtension === null || graphicControlExtension.getTransparentColorFlag() === 0 || i.getIndex() !== graphicControlExtension.getTransparentcolorIndex()) {
                        if (i) {
                            ctx.fillStyle = i.getColor() | 0xff000000;
                            ctx.fillRect(x, y, 1, 1);
                            //this.bufferedImage.setRGB(x, y, i | 0xff000000);
                        }
                    }
                }
            }
        }
    }

    this.getWidth = function () {
        return width;
    };

    this.getHeight = function () {
        return height;
    };

    this.getDictionary = function () {
        return dictionary;
    };

    this.getBufferedImage = function () {
        return this.bufferedImage;
    }
}
