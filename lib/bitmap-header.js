const HEADER_SIZE = 14;
const PIXEL_OFFSET = 10;
const BITS_PER_PIXEL_OFFSET = 28;
const FILE_SIZE_OFFSET = 2;
const BYTES_PER_COLOR = 4;

module.exports = class BitmapHeader {
    constructor(buffer) {
        this.pixelOffset = buffer.readUInt32LE(PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readUInt16LE(BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readUInt32LE(FILE_SIZE_OFFSET);

        const dibHeaderSize = buffer.readUInt32LE(HEADER_SIZE);
        const totalHeader = HEADER_SIZE + dibHeaderSize;

        this.colorPaletteOffset = totalHeader;

        this.isPaletted = this.pixelOffset !== totalHeader;
    }
}
