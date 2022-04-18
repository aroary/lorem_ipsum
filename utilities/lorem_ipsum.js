const getLanguageData = require("./getLanguageData");
const randomItem = require('./randomItem');

const generate = n => {
    const languageData = getLanguageData();
    const generated = [];

    if (n > generated.length) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(languageData);
        while (word === generated[i - 1]) word = randomItem(languageData);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

module.exports = generate;