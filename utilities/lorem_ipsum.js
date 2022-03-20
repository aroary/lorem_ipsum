const vscode = require("vscode")
const fs = require("fs");
const path = require("path");
const languages = fs.readdirSync(path.join(__dirname, '../languages')).filter(dir => dir.endsWith('.json')).map(dir => dir.split`.`.shift());
const randomItem = require('./randomItem');

const generate = (n) => {
    var language = vscode.workspace.getConfiguration('lorem_ipsum').get('language') || 'lat';
    var languageData;

    if (language === "ctm") languageData = vscode.workspace.getConfiguration('lorem_ipsum').get('language.custom');
    else languageData = require(`../languages/${languages.includes(language) ? language : 'lat'}.json`);

    const generated = languageData.start.split` `;

    if (n > generated.length) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(languageData.words);
        while (word === generated[i - 1]) word = randomItem(languageData.words);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

module.exports = generate;