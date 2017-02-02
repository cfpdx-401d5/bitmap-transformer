module.exports = function invert(color) {
    return {
        b: 255 - color.b,
        g: 255 - color.g,
        r: 255 - color.r
    };
}