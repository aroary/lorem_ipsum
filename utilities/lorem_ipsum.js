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

function byte(count) {
    var text = [];
    while (text.join` `.length < count) text.push(generate(1)[0]);
    text = text.join` `.slice(0, -(text.join` `.length - count));
    if (text[text.length - 1] === " ") text = text.slice(0, -1) + ("abcdefghijklmnopqrstuvwxyz".split``[Math.random() * 26]);
    return text;
};

function word(count) {
    return generate(count).join` `;
};

function sentance(count) {
    return new Array(count).fill(undefined).map(() => word(Math.floor(Math.random() * 4) + 16) + ".").join` `;
};

function paragraph(count) {
    return new Array(count).fill(undefined).map(() => sentance(Math.floor(Math.random() * 3) + 5)).join`\n`;
};

function page(count) {
    return new Array(count).fill(undefined).map(() => paragraph(Math.floor(Math.random() * 3) + 5)).join`\n\n`;
};

module.exports = { generate, byte, word, sentance, paragraph, page };