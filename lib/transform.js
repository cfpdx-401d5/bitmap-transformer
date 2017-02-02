const BitmapHeader = require('./read-header');
const fs = require('fs');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
    }

    transformNoPallet(transformation) {
        const header = this.header;
        const buffer = this.buffer;

        let offset = header.whereImageStarts;
        // Loop through the pixels
        while (offset < header.fileSize) {
            const color = {
                // Read the colors of the pixel
                b: buffer.readUInt8(offset),
                g: buffer.readUInt8(offset + 1),
                r: buffer.readUInt8(offset + 2)
            };

            // Make a transformation to the colors
            const newColor = transformation(color);

            // Write the new color back to the buffer
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);

            // Move to the next pixel
            offset += 3;
        }

        return buffer;
    }

    transformPalette(transformation) {
        const header = this.header;
        const buffer = this.buffer;

        let offset = header.totalHeaderSize;

        while (offset < header.whereImageStarts) {
            const color = {
                // Read the colors of the pixel
                b: buffer.readUInt8(offset),
                g: buffer.readUInt8(offset + 1),
                r: buffer.readUInt8(offset + 2)
            };

            // Make a transformation to the colors
            const newColor = transformation(color);

            // Write the new color back to the buffer
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);

            //move to next entry
            offset += 4;

        }

        return buffer;
    }

    write(fileName, data, cb) {
        fs.writeFile(fileName, data, cb);
    }

};