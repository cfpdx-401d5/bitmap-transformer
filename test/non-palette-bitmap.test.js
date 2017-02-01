const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header')

describe('bitmap file', () => {

    let buffer = null;
    before( function(done) {
        fs.readFile('./test/non-palette-bitmap.bmp', (err, _buffer) => {
            if(err) done(err);
            else {
                buffer = _buffer;
                console.log(buffer);
                done();
            }
        });
    });

    it('reads header', function() {
        const header = new BitmapHeader(buffer);
        console.log(header);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.isPaletted, false);
    });
})