const HEADER_SIZE = 14;
const PIXEL_OFFSET = 10;
const BITS_PER_PIXEL_OFFSET = 28;
const FILE_SIZE_OFFSET = 2;
const OFFSET_COLOR = 46;

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readUInt32LE(PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readUInt16LE(BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readUInt32LE(FILE_SIZE_OFFSET);
        this.isPaletted = buffer.readUInt32LE(OFFSET_COLOR);
        this.dibHeaderSize = buffer.readUInt32LE(HEADER_SIZE);
    }
}
