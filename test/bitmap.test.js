const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapXformer = require('../lib/bitmap-xform');
const invert = require('../lib/invert-xform');

describe('bitmap file :', () => {

    let buffer = null;
    before(done => {
        fs.readFile('./test/non-palette-bitmap.bmp', (err, _buffer) => {
            if(err) done(err);
            else {
                buffer = _buffer;
                done();
            }
        });
    });

    it('reads bitmap header', () => {
        const header = new BitmapHeader(buffer);
        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.isPaletted, false);
    });


    // "pinning" test, or "snapshot" test
    it('test whole transform', done /*()*/ => {
        // use the BitmapTransformer class, passing in the buffer from the file read.
        const bitmap = new BitmapXformer(buffer);

        // call transform, which will modify the buffer.
        // in this api, you pass in a transformation function
        bitmap.transform(invert);

        // after above step, the buffer has been modified
        
        // sync version:
        // const buffer = fs.readFileSync('./test/output.bmp');
        // assert.deepEqual(bitmap.buffer, buffer);
        
        // async version:
        // read the output file we saved earlier to be the "standard" expected output file
        fs.readFile('./test/output.bmp', (err, buffer) => {
            assert.deepEqual(bitmap.buffer, buffer);
            done();
        });

        // if you don't have a standard file yet, you could write it out...
        // fs.writeFile('./test/output.bmp', bitmap.buffer, err => {
        //     done(err);
        // });
    });

    describe('bitmap transformations', () => {
        it('inverts color', () => {
            const color = { r: 100, g: 100, b: 100 };
            const inverted = invert(color);
            assert.deepEqual(inverted, { r: 155, g: 155, b: 155 });
        });
    });

});