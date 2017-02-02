const assert = require('assert');
const fs = require('fs');
const BitmapHeader = require('../lib/bitmap-header');
const BitmapXformer = require('../lib/bitmap-xform');
const invert = require('../lib/invert-xform');

// describe('bitmap file :', () => {

//   let buffer = null;
  
// 	before(done => {
// 		fs.readFile('./test/non-palette-bitmap.bmp', (err, _buffer) => {
// 			if(err) done(err);
// 			else {
// 				buffer = _buffer;
// 				done();
// 			}
// 		});
// 	});

// 	it('reads bitmap header', () => {
		
// 		const header = new BitmapHeader(buffer);
// 		assert.equal(header.pixelOffset, 54);
// 		assert.equal(header.bitsPerPixel, 24);	
// 		assert.equal(header.fileSize, 30054);
// 		assert.equal(header.isPaletted, false);
// 	});

// 	it('tests whole bitmap transform', done /*()*/ => {

// 		const bitmap = new BitmapXformer(buffer);

// 		bitmap.transform(invert);

// 		fs.writeFile('./test/modifiedBitmap.bmp', bitmap.buffer, err => {
// 			if (err) return done(err);
// 			fs.readFile('./test/modifiedBitmap.bmp', (err, buffer) => {
// 				assert.deepEqual(bitmap.buffer, buffer);
// 				done();
// 			});
		
// 		});
// 	});
// });

// describe('bitmap transformations :', () => {	
			
// 	it('inverts colors', () => {
// 		const color = { r: 100, g: 100, b: 100 };
// 		const inverted = invert(color);
// 		assert.deepEqual(inverted, { r: 155, g: 155, b: 155 });
// 	});

// });
