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
  
  it('checks the invert function', () => {
    const bitMap = new BitmapTransformer(buffer);
    const color = {
      r: 155,
      g: 155,
      b: 155,
    }
    const newColor = bitMap.invert(color);
    assert.deepEqual(newColor, {r: 100, g: 100, b: 100});
  });


  it('transforms the file', done => {
    var bitMap = new BitmapTransformer(buffer);
    bitMap.transform();
    // fs.writeFile('./inverted.bmp', bitMap.buffer, (err) => {
    //   done(err);
    // })
    fs.readFile('./inverted.bmp', (err, buffer) =>{
      assert.deepEqual(bitMap.buffer, buffer);
      done(err);
    });
  });
});