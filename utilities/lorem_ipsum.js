const vscode = require("vscode");

/**
 * @description Generate random text.
 * @param {number} n - The number of words to generate.
 * @returns {array<string>} An array of random text.
 */
function generate(n) {
    const data = vscode.workspace.getConfiguration('lorem_ipsum').get('language');
    return new Array(n).fill(undefined).map(() => data[Math.floor(Math.random() * data.length)]);
};

module.exports = generate;