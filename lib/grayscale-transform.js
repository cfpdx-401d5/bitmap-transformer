module.exports = function grayscale(color) {
    var avg = (color.r + color.g + color.b) / 3;

    return {
        r: avg,
        g: avg,
        b: avg
    };
    
}