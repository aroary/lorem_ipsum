const vscode = require("vscode")
const fs = require("fs");
const path = require("path");
const languages = fs.readdirSync(path.join(__dirname, '../languages')).filter(dir => dir.endsWith('.json')).map(dir => dir.split`.`.shift());
const randomItem = require('./randomItem');

const generate = (n) => {
    var language = vscode.workspace.getConfiguration('lorem_ipsum').get('language') || 'lat';
    if (!languages.includes(language)) language = 'lat';

    const languageData = require(`../languages/${language}.json`);
    const generated = languageData.start.split` `;

    if (n > 8) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(languageData.words);
        while (word === generated[i - 1]) word = randomItem(languageData.words);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

module.exports = generate;