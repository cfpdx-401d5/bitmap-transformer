const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/read-header');
const invert = require('../lib/invert-transformer');
const grayscale = require('../lib/grayscale-transform');
const BitmapTransformer = require('../lib/transform');

let noPaletteBuffer = null;
let paletteBuffer = null;

describe('read the header of a bitmap file', () => {

    // Open file(s) using fs and read it into a buffer
    before(done => {
        fs.readFile('./non-palette-bitmap.bmp', (err, data) => {
            if (err) done(err);
            else {
                noPaletteBuffer = data;
                done();
            }
        });
    });

    before(done => {
        fs.readFile('./palette-bitmap.bmp', (err, data) => {
            if (err) done(err);
            else {
                paletteBuffer = data;
                done();
            }
        });
    });

    it('reads header', () => {
        const header = new BitmapHeader(noPaletteBuffer);
        assert.equal(header.isPalette, false);
        assert.equal(header.fileSize, 30054);
        assert.equal(header.whereImageStarts, 54);
        assert.equal(header.bitsPerPixel, 24);
    });

});

describe('transformations to the non-palette bmp', () => {
    it('inverts all the rgb colors of the original bmp', done => {
        const bitmap = new BitmapTransformer(noPaletteBuffer);
        const bmpBuffer = bitmap.transform(invert);

        // Write the changed buffer/image to a new bitmap file
        bitmap.write('./test/output.bmp', bmpBuffer, (err) => {
            if (err) return err;
            else {
                // Read and assert the new file
                fs.readFile('./test/output.bmp', (err, buffer) => {
                    assert.deepEqual(bmpBuffer, buffer);
                    done();
                });
            }
        });
    });

    it('grayscales all the rgb colors of the original bmp', done => {
        const bitmap = new BitmapTransformer(noPaletteBuffer);
        const bmpBuffer = bitmap.transform(grayscale);

        bitmap.write('./test/grayscale.bmp', bmpBuffer, (err) => {
            if (err) return err;
            // async version
            fs.readFile('./test/grayscale.bmp', (err, buffer) => {
                assert.deepEqual(bmpBuffer, buffer);
                done();
            });
        });
    });

});