const HEADER_SIZE = 14;
const FILE_SIZE_OFFSET = 2;
const PIXEL_OFFSET = 10;
const BITS_PER_PIXEL_OFFSET = 28;

module.exports = class BitmapHeader {
    constructor(buffer) {
        // where do the pixels start?
        this.pixelOffset = buffer.readUInt32LE(PIXEL_OFFSET);
        this.bitsPerPixel = buffer.readUInt16LE(BITS_PER_PIXEL_OFFSET);
        this.fileSize = buffer.readUInt32LE(FILE_SIZE_OFFSET);

        // read beginning of dib header for it's size
        const dibHeaderSize = buffer.readUInt32LE(HEADER_SIZE);
        const totalHeader = HEADER_SIZE + dibHeaderSize;
        
        this.isPaletted = this.pixelOffset !== totalHeader;
    }

    /* if we have prototype functions, they go here */   
};

// above class same as:
// function BitmapHeader(buffer) {
//     //constructor logic goes here
// }
// if it had methods:
// BitmapHeader.prototype.transform = function() {};