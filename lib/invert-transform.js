module.exports = function invert(color) {
    return {
        red: 255 - color.red,
        green: 255 - color.green,
        blue: 255 - color.blue
    };
};