const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header.js');
const BitmapTransformer = require('../lib/bitmap-transformer.js');

describe('inverts colors in a bitmap', () => {

  let buffer = null;
  before(done => {
    fs.readFile('./non-palette-bitmap-test.bmp', (err, _buffer) => {
      if(err) done(err);
      else {
        buffer = _buffer;
        done();
      }
    });
  });
  
  it('gives correct header data', () => {
    const bmHeader = new BitmapHeader(buffer);
    assert.equal(bmHeader.pixelOffset, 54);
    assert.equal(bmHeader.bitsPerPixel, 24);
    assert.equal(bmHeader.fileSize, 30054);
    assert.equal(bmHeader.isPaletted, false);
  })
});