function decompress(bytes, codeLength, dict) {
    let bitsToRead = codeLength + 1;
    let bitOffset = bitsToRead;

    dict = dict.slice(0, Math.floor(Math.pow(2, codeLength) + 2));
    let dictionary = [];
    for (let i = 0; i < dict.length; i++) {
        const l = [];
        l.push(new ColorAndIndex(dict[i][0], i));
        dictionary.push(l);
    }

    let code = getCode(bytes, bitOffset, bitsToRead);

    let previousCodeValue;
    let currentCodeValue = [];
    for (let i = 0; i < dictionary[code].length; i++)
        currentCodeValue.push(dictionary[code][i]);

    let indices = [];

    indices.push(currentCodeValue[0]);

    previousCodeValue = [...currentCodeValue];

    bitOffset = bitsToRead * 2;

    let end = false;

    while (!end) {
        code = getCode(bytes, bitOffset, bitsToRead);
        bitOffset += bitsToRead;
        if (code === (Math.pow(2, codeLength))) {
            bitsToRead = (codeLength + 1);
            let newDictionary = [];
            for (let j = 0; j < Math.pow(2, codeLength) + 2; j++)
                newDictionary.push(dictionary[j]);
            dictionary = newDictionary;
            let c = getCode(bytes, bitOffset, bitsToRead);
            bitOffset += bitsToRead;
            currentCodeValue = [...dictionary[c]];
            indices.push(currentCodeValue[0]);
            previousCodeValue = [...dictionary[c]];
        } else if (code === (Math.pow(2, codeLength) + 1))
            end = true;

        if (code !== (Math.pow(2, codeLength))) {
            if (dictionary.length > code) {
                currentCodeValue = [...dictionary[code]];
                for (let a = 0; a < currentCodeValue.length; a++)
                    indices.push(currentCodeValue[a]);
                let k = currentCodeValue[0];
                let toAdd = [];
                for (let i = 0; i < previousCodeValue.length; i++)
                    toAdd.push(new ColorAndIndex(previousCodeValue[i].getColor, previousCodeValue[i].getIndex()));
                toAdd.push(k);
                if (dictionary.length !== 4096)
                    dictionary.push(toAdd);
                if (dictionary.length === Math.pow(2, bitsToRead) && bitsToRead < 12)
                    bitsToRead++;
                previousCodeValue = [...currentCodeValue];
            } else {
                let k = previousCodeValue[0];
                let toAdd = [];
                for (let i = 0; i < previousCodeValue.length; i++)
                    toAdd.push(new ColorAndIndex(previousCodeValue[i].getColor(), previousCodeValue[i].getIndex()));
                toAdd.push(k);
                for (let i = 0; i < toAdd.length; i++)
                    indices.push(new ColorAndIndex(toAdd[i].getColor(), toAdd[i].getIndex()));
                if (dictionary.length !== 4096)
                    dictionary.push([...toAdd]);
                if (dictionary.length === Math.pow(2, bitsToRead) && bitsToRead < 12)
                    bitsToRead++;
                previousCodeValue = [];
                for (let i = 0; i < dictionary[code].length; i++)
                    previousCodeValue.push(new ColorAndIndex(dictionary[code][i].getColor(), dictionary[code][i].getIndex()));
            }
        }
    }

    return indices;
}

function getCode(bytes, bitOffset, amountOfBitsToRead) {
    let bitsRemainingInFirstByte = 8 - (bitOffset % 8);
    let bitsToReadFromFirstByte = Math.min(bitsRemainingInFirstByte, amountOfBitsToRead);

    let amountOfBitsWeStillNeed = bitsRemainingInFirstByte >= amountOfBitsToRead ? 0 : amountOfBitsToRead - bitsRemainingInFirstByte;
    let bitsToReadFromLastByte = amountOfBitsWeStillNeed === 8 ? 8 : amountOfBitsWeStillNeed % 8;

    let amountOfBytesToReadFrom = Math.floor(Math.ceil((amountOfBitsToRead - bitsRemainingInFirstByte) / 8) + 1);
    let firstByteIndex = Math.floor(bitOffset / 8);

    let bytesToRead = bytes.slice(firstByteIndex, firstByteIndex + amountOfBytesToReadFrom);
    if (bitsToReadFromFirstByte < bitsRemainingInFirstByte && (bitOffset % 8 === 0))
        return ((bytesToRead[0] & Math.floor(Math.pow(2, bitsToReadFromFirstByte) - 1)));
    else {
        let firstByteValue = ((bytesToRead[0] & (256 - Math.floor(Math.pow(2, 8 - bitsToReadFromFirstByte)))) >> (8 - bitsToReadFromFirstByte));
        let bitsReadAlready = bitsRemainingInFirstByte;

        if (bytesToRead.length === 1)
            return firstByteValue;
        if (bytesToRead.length === 2) {
            firstByteValue = firstByteValue | ((bytesToRead[1] & Math.floor(Math.pow(2, bitsToReadFromLastByte) - 1)) < bitsReadAlready);
            bitsReadAlready += bitsToReadFromLastByte;
            return firstByteValue;
        }
        if (bytesToRead.length === 3) {
            firstByteValue = firstByteValue | ((bytesToRead[1] & 0xff) << bitsReadAlready);
            bitsReadAlready += 8;
            firstByteValue = firstByteValue | ((bytesToRead[2] & Math.floor(Math.pow(2, bitsToReadFromLastByte) - 1)) < bitsReadAlready);
            bitsReadAlready += bitsToReadFromLastByte;
            return firstByteValue;
        }
    }
    return -10000;
}

/*
function readBits(bytes, bitOffset, amountOfBitsToRead) {
    let firstByteValue, secondByteValue = 0, thirdByteValue = 0;
    let byteIndex = Math.floor(bitOffset / 8);
    let amountOfBitsToReadInFirstByte = Math.min(8 - (bitOffset % 8), amountOfBitsToRead);
    amountOfBitsToRead -= amountOfBitsToReadInFirstByte;
    let amountOfBitsToReadInSecondByte = Math.min(8, amountOfBitsToRead);
    amountOfBitsToRead -= amountOfBitsToReadInSecondByte;
    let amountOfBitsToReadInThirdByte = Math.min(8, amountOfBitsToRead);
    firstByteValue = (bytes[byteIndex] >> (bitOffset % 8)) & Math.floor(Math.pow(2, amountOfBitsToReadInFirstByte) - 1);
    if (bytes.length > byteIndex + 1)
        secondByteValue = bytes[byteIndex + 1] & Math.floor(Math.pow(2, amountOfBitsToReadInSecondByte) - 1);
    if (bytes.length > byteIndex + 2)
        thirdByteValue = bytes[byteIndex + 2] & Math.floor(Math.pow(2, amountOfBitsToReadInThirdByte) - 1);
    return firstByteValue | (secondByteValue << amountOfBitsToReadInFirstByte) | (thirdByteValue << (amountOfBitsToReadInFirstByte + amountOfBitsToReadInSecondByte));
}
*/
