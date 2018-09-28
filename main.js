const fileInput = document.getElementById("myfileinput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

fileInput.onchange = function () {

    const file = fileInput.files[0];
    let fileReader = new FileReader();
    fileReader.onload = receivedBinary;
    fileReader.readAsArrayBuffer(file);

    function receivedBinary() {
        const data = new Buffer(fileReader.result);
        data.incrementPointer(6);
        const gifHeader = new GifHeader(data);
        const dictionary = gifHeader.getDictionary();
        const components = [];
        const extensions = [];
        const images = [];
        readExtensionsAndImages();

        let bufferedImage = {};

        function readExtensionsAndImages() {
            while (data.getPointer() < 336282) {
                const identificationByte = data.readByte();
                switch (identificationByte) {
                    case 0x2C:
                        const previousComponent = components[components.length - 1];
                        const gcExtension = (previousComponent instanceof GraphicControlExtension) ? previousComponent : null;
                        const currentImage = new GifImage(data, gifHeader.getHeader().getBackgroundColor(), gcExtension, dictionary);
                        components.push(currentImage);
                        images.push(currentImage);
                        console.log('hi')
                      //  if (bufferedImage === null) {
                       //     bufferedImage = 'hi'; //currentImage.getImageData().getBufferedImage();
                 //           ImageIO.write(img, "PNG", new File("frame-" + images.length + ".png"));
                       // } else {
                   //         let g = bufferedImage.getGraphics();
                   //         let image = images[images.length - 1];
                   //         g.drawImage(image.getImageData().getBufferedImage(), image.getLocalImageDescriptor().getLeft(), image.getLocalImageDescriptor().getTop(), image.getLocalImageDescriptor().getWidth(), image.getLocalImageDescriptor().getHeight(), null);
                   //         ImageIO.write(img, "PNG", new File("frame-" + images.length + ".png"));
                        //}
                        break;
                    case 0x21:
                        console.log('hi2')
                        const extension = new ExtensionInformation(data).getExtension();
                        components.push(extension);
                        extensions.push(extension);
                        break;
                }
            }
        }

    }
};
