// const BitmapHeader = require('./bitmap-header');
// const invert = require('./invert-xform');
// const fs = require('fs');

// module.exports = class BitmapXformer {
  
// 	constructor(buffer) {
//     this.header = new BitmapHeader(buffer);
//     this.buffer = buffer;
//   }

//   transform(transformation) {
//     const header = this.header;
//     const buffer = this.buffer;

// 		let offset = header.pixelOffset;

// 		for (let i = header.pixelOffset; i < header.fileSize - 2; i+=3) {		
// 			const color = {
// 				b: buffer.readUInt8(offset),
// 				g: buffer.readUInt8(offset + 1),
// 				r: buffer.readUInt8(offset + 2)
// 			};

// 			const newColor = transformation(color);

// 			buffer.writeUInt8(newColor.b, offset);
// 			buffer.writeUInt8(newColor.g, offset + 1);
// 			buffer.writeUInt8(newColor.r, offset + 2);
		
// 			offset += 3;
// 		}
// 	}

// 	toInverted() {
// 		this.transform(invert);
// 	}

// 	write(filename, cb) {
// 		fs.writeFile('modifiedBitmap.bmp', this.buffer, err => {
// 			if(err) cb(err);
// 			else cb();
// 		});
// 	}

// 	read(filename, cb) {
// 		fs.readFile(filename, (err, data) => {
// 			if (err) return cb(err);
// 			return new BitmapXformer(data);
// 		});
// 	}

// };