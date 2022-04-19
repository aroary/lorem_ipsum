const getLanguageData = require("./getLanguageData");
const randomItem = require('./randomItem');

/**
 * @description Generate random text.
 * @param {number} n - The number of words to generate.
 * @returns {array<string>} An array of random text.
 */
function generate(n) {
    const languageData = getLanguageData();
    const generated = [];
    while (generated.length < n) generated.push(randomItem(languageData));
    return generated;
};

module.exports = generate;