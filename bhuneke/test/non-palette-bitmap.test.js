const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transform');

describe('bitmap file', () => {

    let buffer = null;
    before( function(done) {
        fs.readFile('./test/non-palette-bitmap.bmp', (err, _buffer) => {
            if(err) done(err);
            else {
                buffer = _buffer;
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

    it('test transform', done => {
        const bitmap = new BitmapTransformer(buffer);
        //console.log('buffer: ', buffer);
        bitmap.transform(invert);
        //console.log('bitmap: ', bitmap);
        //assert.deepEqual(bitmap.buffer, buffer);

        fs.readFile('./test/output.bmp', (err, buffer) => {
            assert.deepEqual(bitmap.buffer, buffer);//supposed to be able to write the inverted buffer somewhere and compare that
            //done();
        });

        fs.writeFile('./test/output.bmp', bitmap.buffer, err => {done(err)});
    });

    describe('transformations', () => {
        it('inverts color', () => {
            const color = { red: 100, green: 100, blue: 100 };
            const inverted = invert(color);
            assert.deepEqual(inverted, { red: 155, green: 155, blue: 155 });
        })
    });
});