const vscode = require("vscode")
const words = require('./words.json')
const randomItem = require('./randomItem');

const generate = (n) => {
    const language = vscode.workspace.getConfiguration('lorem-ipsum').get('language');
    const generated = words[language || 'en'].start.split` `;

    if (n > 8) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(words[language || 'en'].words);
        while (word === generated[i - 1]) word = randomItem(words);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

module.exports = generate;