// invert the pixels to reverse image colors
// receive a color object
module.exports = function invert(color) {
    return {
        r: 255 - color.r,
        g: 255 - color.g,
        b: 255 - color.b
    };
};