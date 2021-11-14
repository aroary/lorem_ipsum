const words = require('./words.json')
const randomItem = require('./randomItem');

const generate = (n) => {
    const generated = [];

    for (let i = 0; i < n; i++) {
        var word = randomItem(words);
        while (word === generated[i - 1]) word = randomItem(words);

        if (!(((i + 1) / 8) % 1)) word += randomItem(['.', '?', '!']);
        if (!(((i + 1) / 64) % 1)) word += '\n';

        generated.push(word);
    };

    const text = generated.join` `.split`\n`.map(v => v.trim()).join`\n`;

    return "lorem ipsum dolor sit amet consectetur adipisicing elit. " + randomItem(words) + text;
};

module.exports = generate;