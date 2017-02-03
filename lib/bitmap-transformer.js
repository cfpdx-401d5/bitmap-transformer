// get a bitmap, build transformer class, write buffer to file and other stuff
const fs = require('fs');
const BitmapHeader = require('./bitmap-header');
const invert = require('./invert-transform.js'); // do I need to move this

module.exports = class BitmapTransformer {
        constructor(buffer) {
            this.head = new BitmapHeader(buffer); //put the range of bits to read here
            this.buffer = buffer; // skip the header ?
            // what else do I need here
        }

        transform(transformation) {
                //the fun stuff
            } //end transform

        //from the class work
        toInverted() {
                this.transform(invert);
            } // end inverted

        write(filename, cb) { // keep in mind the callback is waiting from write response
                fs.writeFile(filename, this.buffer, err => {
                    if (err) cb(err);
                    else cb();
                }); // end write
            }
            // BitmapTransformer.read = function(filename, cb) {
        static read(filename, cb) {
            fs.readFile(filename, (err, data) => {
                if (err) return cb(err);
                return new BitmapTransformer(data);
            });
        }
    } // end class bitmaptransformer