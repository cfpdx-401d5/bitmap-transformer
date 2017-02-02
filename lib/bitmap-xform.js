const BitmapHeader = require('./bitmap-header');
const invert = require('./invert-xform');
const fs = require('fs');

module.exports = class BitmapXformer {
    constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
        // any other setup needed ...
    }

    transform(transformation) {
        const header = this.header;
        const buffer = this.buffer;

        let offset = header.pixelOffset;
        // 1. looping through the pixels
        while(offset < header.fileSize) {
            // 2. reading the colors of the pixel
            const color = {
                b: buffer.readUInt8(offset),
                g: buffer.readUInt8(offset + 1),
                r: buffer.readUInt8(offset + 2)
            };

            // 3. transform the colors
            const newColor = transformation(color);

            // 4. writing the color pack to the buffer
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);
            
            offset += 3;
        }
    }

    toInverted() {
        this.transform(invert);
    }

    write(filename, cb) {
        fs.writeFile(filename, this.buffer, err => {
            if(err) cb(err);
            else cb();
        });
    }
};

BitmapXformer.read = function(filename, cb) {
    fs.readFile(filename, (err, data) => {
        if(err) return cb(err);

        return new BitmapXformer(data);
    });
};