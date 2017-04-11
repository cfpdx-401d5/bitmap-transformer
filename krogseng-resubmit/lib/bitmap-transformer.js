// get a bitmap, build transformer class, write buffer to file and other stuff
const fs = require('fs');
const BitmapHeader = require('./bitmap-header');
const invert = require('./invert-transform'); // do I need to move this

module.exports = class BitmapTransformer {
        constructor(buffer) {
            this.head = new BitmapHeader(buffer); //put the range of bits to read here
            this.buffer = buffer;
        }

        transform(transformation) {
                const header = this.head;
                const buffer = this.buffer;

                let offset = header.pixelOffset;

                // loop through the pixel arrays, build color object
                while (offset < header.fileSize) {
                    const color = {
                        b: buffer.readUInt8(offset),
                        g: buffer.readUInt8(offset + 1),
                        r: buffer.readUInt8(offset + 2)
                    };
                    // get new color object from the transform function passed in
                    //const newColor = transformation(color);
                    const newColor = transformation(color);
                    //put the new colors back into the buffer
                    buffer.writeUInt8(newColor.b, offset);
                    buffer.writeUInt8(newColor.g, offset + 1);
                    buffer.writeUInt8(newColor.r, offset + 2);

                    //move to the next pixel
                    offset += 3;
                }; // end loop
                return buffer;
            } //end transform


        write(filename, cb) { // keep in mind the callback is waiting for write response
            fs.writeFile(filename, this.buffer, err => {
                if (err) cb(err);
                else cb();
            }); // end write
        }

        static read(filename, cb) {
            fs.readFile(filename, (err, data) => {
                if (err) return cb(err);
                return new BitmapTransformer(data);
            });
        }
    } // end class bitmaptransformer