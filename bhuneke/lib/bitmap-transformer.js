const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransformer {
    constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
    }

    transform(transformation) {
        const header = this.header;
        const buffer = this.buffer;


        let offset = header.pixelOffset;


        while(offset < header.fileSize) {
            const color = {
                blue: buffer.readUInt8(offset),
                green: buffer.readUInt8(offset + 1),
                red: buffer.readUInt8(offset + 2)
            }
            const newColor = transformation(color);

            buffer.writeUInt8(newColor.blue, offset);
            buffer.writeUInt8(newColor.green, offset + 1);
            buffer.writeUInt8(newColor.red, offset + 2);

            offset += 3;
        }
    }
};