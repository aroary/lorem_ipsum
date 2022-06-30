const getLanguageData = require("./getLanguageData");
const randomItem = require('./randomItem');

/**
 * @description Generate random text.
 * @param {number} n - The number of words to generate.
 * @returns {array<string>} An array of random text.
 */
function generate(n) {
    const data = getLanguageData();
    return new Array(n).fill(undefined).map(() => randomItem(data));
};

module.exports = generate;