const words = require('./words.json')
const randomItem = require('./randomItem');

const generate = (n) => {
    const generated = "lorem ipsum dolor sit amet consectetur adipisicing elit".split` `;

    if (n > 8) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(words);
        while (word === generated[i - 1]) word = randomItem(words);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

module.exports = generate;