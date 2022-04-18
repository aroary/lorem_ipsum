const getLanguageData = require("./getLanguageData");
const randomItem = require('./randomItem');

const generate = n => {
    const languageData = getLanguageData();
    const generated = [];
    for (; generated.length < n; generated.push(randomItem(languageData)));
    return generated;
};

module.exports = generate;