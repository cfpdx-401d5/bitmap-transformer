const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransform = require('../lib/bitmap-transform')
const invert = require('../lib/invert-colors');

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
    it('test transform', done => {
        const bitmap = new BitmapTransform(buffer);
        bitmap.transform(invert);

        fs.writeFile('./test/palette-output.bmp', buffer, (err) => {
            if (err) done(err);
            else done();
        })
        // const buffer = fs.readFileSync('./test/output.bmp');
        // assert.deepEqual(bitmap.buffer, buffer);
        
        // fs.readFile('./test/output.bmp', (err, buffer) => {
        //     assert.deepEqual(bitmap.buffer, buffer);
        //     done();
        // });
    });

});