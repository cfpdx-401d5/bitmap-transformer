const fs = require('fs');
const BitmapHeader = require('./bitmap-header.js');

constructor(buffer) {
        this.header = new BitmapHeader(buffer);
        this.buffer = buffer;
        // any other setup needed....
    }

    transform(transformation) {
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
            function invert(color) {
              return {
                r: 255 - color.r,
                g: 255 - color.g,
                b: 255 - color.b
              };
            };
            
            const newColor = invert(color);

            // 4. writing the color pack to the buffer
            buffer.writeUInt8(newColor.b, offset);
            buffer.writeUInt8(newColor.g, offset + 1);
            buffer.writeUInt8(newColor.r, offset + 2);
            
            offset += 3;
        }
    }

    toInverted() {
        this.transform(invert);
    }

    write(filename, cb) {
        fs.writeFile(filename, this.buffer, err => {
            if(err) cb(err);
            else cb();
        });
    }
}

BitmapTransformer.read = function(filename, cb) {
    fs.readFile(filename, (err, data) => {
        if(err) return cb(err);

        return new BitmapTransformer(data);
    })
}

//how does one code for buffer?

//copy/paste the lines from invert-transform.js into where cons new color = transform(color)
//have a test copy of the bitmap