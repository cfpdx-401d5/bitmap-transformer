const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');

describe('working with bitmaps', () => {
    
    let buffer = null;
    before(done => {
        fs.readFile('./test/palette-bitmap.bmp', (err, _buffer) => {
            if(err) done(err);
            else {
                buffer = _buffer;
                done();
            }
        });
    });
    it('reads the header', () => {
        const header = new BitmapHeader(buffer);
        assert.equal(header.fileSize, 11078);
        assert.equal(header.isPaletted, true);
        assert.equal(header.pixelOffset, 1078);
        assert.equal(header.bitsPerPixel, 8);
    })


});