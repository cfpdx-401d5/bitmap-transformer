const fs = require('fs');
const BitmapHeader = require('./bitmap-header.js');
const path = require('path');

module.exports = class BitmapTransformer {
  constructor(buffer) {
    this.header = new BitmapHeader(buffer);
    this.buffer = buffer;
        // any other setup needed....
  }
  
  transform() {
    const header = this.header;
    const buffer = this.buffer;

    let offset = header.pixelOffset;
        // 1. looping through the pixels
    while(offset < header.fileSize) {
            // 2. reading the colors of the pixel
      const color = {
        b: buffer.readUInt8(offset),
        g: buffer.readUInt8(offset + 1),
        r: buffer.readUInt8(offset + 2)
      }

            // 3. transform the colors
      const newColor = {
          r: 255 - color.r,
          g: 255 - color.g,
          b: 255 - color.b
        };

        // 4. writing the color pack to the buffer
      buffer.writeUInt8(newColor.b, offset);
      buffer.writeUInt8(newColor.g, offset + 1);
      buffer.writeUInt8(newColor.r, offset + 2);
            
      offset += 3;
      }
    }

    write(filename, cb) {
      fs.writeFile('../inverted.bmp', this.buffer, err => {
        if(err) cb(err);
        else cb();
    });
  }

  read(filename, cb) {
    fs.readFile(filename, (err, data) => {
        if(err) return cb(err);

        return new BitmapTransformer(data);
    });
  }
}