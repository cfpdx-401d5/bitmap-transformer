// one-two-three-testing
const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transform');


describe('test whole transformation of the bitmap', () => {
    let buffer = null;
    before(done => {
        fs.readFile('./images/non-palette-bitmap.bmp', (err, _buffer) => {
            if (err) done(err);
            else {
                buffer = _buffer;
                done();
            };
        });
    }); //end buffer

    after(done => {
        fs.unlink('./test/output.bmp', err => {
            if (err) done(err);
            done();
        });
    });


    it('read header', done => {
        const header = new BitmapHeader(buffer);

        assert.equal(header.pixelOffset, 54);
        assert.equal(header.bitsPerPixel, 24);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.isPaletted, false);
        done();
    });

    describe('transformations', () => {
        it('checks that buffer is correctly written', done => {
            const bitmap = new BitmapTransformer(buffer);
            const bmpBuffer = bitmap.transform(invert);

            bitmap.write('./test/output.bmp', (err, buffer) => {
                if (err) done(err);
                else {
                    fs.readFile('./test/output.bmp', (err, buffer) => {
                        assert.deepEqual(bitmap.buffer, buffer);
                        done();
                    })
                }
            });

        }); // check buffer writes
        it('checks invert results are transformed', () => {
            const color = {
                r: 100,
                g: 100,
                b: 100
            };
            const inverted = invert(color);
            assert.deepEqual(inverted, { r: 155, g: 155, b: 155 });
        })

    }); // close describe transformations

}); //close test