const { a, b, c } = require("./letterData.json");

/**
 * @description Generate a string of random words.
 * @param {number} words 
 * @returns {string} `number` words
 */
function generate(words) {
    var str = '';

    for (var i = 0; i < words; i++) str += word() + ' ';

    return str;
};

function word() {
    const n = random(2, 6);

    var str = '', last;
    for (var i = 0; i < n; i++) {
        var type = r(1, 10);

        if (last > 1 && last < 4) type = 1;
        if (last == 1 && random(1, 2) == 1) type = 2;

        if (type < 4) {
            str += a[random(0, a.length - 1)];
            last = 1;
        } else if (type < 9) {
            str += b[random(0, b.length - 1)];
            last = 2;
        } else {
            str += c[random(0, c.length - 1)];
            last = 3;
        };
    };

    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = generate;