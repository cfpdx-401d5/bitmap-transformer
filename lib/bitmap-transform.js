const BitmapHeader = require('./bitmap-header');

module.exports = class BitmapTransform {
    constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
    }

    transform(transformation) {
        const header = this.header;
        const buffer = this.buffer;

        if (this.isPaletted) {
            for(var i = 0; i < 256; i++) {
                var offset = this.colorPaletteOffset + (BYTES_PER_COLOR * i);
                const color = {
                    b: buffer.readUInt8(offset),
                    g: buffer.readUInt8(offset + 1),
                    r: buffer.readUInt8(offset + 2)  
                }
                
                const newColor = transformation(color);
                //TODO: fix me! Replace 0's
                buffer.writeUInt8(0, offset);
                buffer.writeUInt8(0, offset + 1);
                buffer.writeUInt8(0, offset + 2);
            }
        }            
    }
}