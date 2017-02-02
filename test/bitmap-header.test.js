const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransform = require('../lib/bitmap-transform')
const invert = require('../lib/invert-colors');

let palette = null;
let noPalette = null;

describe('working with bitmaps', () => {

    before(done => {
        fs.readFile('./test/palette-bitmap.bmp', (err, _buffer) => {
            if(err) done(err);
            else {
                palette = _buffer;
                done();
            }
        });
    });

    before(done => {
        fs.readFile('./test/non-palette-bitmap.bmp', (err, _buffer) => {
            if (err) done(err);
            else {
                noPalette = _buffer;
                done();
            }
        });
    });


    it('reads the header', () => {
        const header = new BitmapHeader(noPalette);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.isPaletted, false);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
    });
});

describe('invert transformation', () => {    
    it('test transform', () => {
        const bitmap = new BitmapTransform(noPalette);
        const invertBuf = bitmap.transform(invert);
            bitmap.write('./test/output.bmp', invertBuf, (err) => {
                if (err) return err;
                else {
                    fs.readFile('./test/output.bmp', (err, buffer) => {
                        assert.deepEqual(invertBuf, buffer);
                        done();
                    })
                }
        
        });
    });
});