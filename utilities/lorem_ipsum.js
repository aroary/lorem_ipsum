const words = require('words.json')
const randomItem = require('./randomItem');

const generate = (n) => {
    const generated = [];

    for (let i = 0; i < n; i++) {
        // Start every generated string with 'lorem ipsum dolor sit amet consectetur adipisicing elit.'
        if (i < 9) generated.push('lorem ipsum dolor sit amet consectetur adipisicing elit.'.split` `[i]);
        else generated.push(randomItem(words) + randomItem(["", "", "", "", ".", ",", "!", "?"]));
    };

    let fullString = generated.join` `.replace(/  /gm, ' ');
    const splitted = fullString.split` `;
    for (let i = 0; i < splitted.length; i++) {
        if ([".", "!", "?"].includes(splitted[i].slice(-1))) {
            const charPos = splitted.slice(0, i + 1).join` `.length + 1;
            fullString = 
                fullString.slice(0, charPos) + 
                fullString.charAt(charPos).toUpperCase() + 
                fullString.slice(charPos, fullString.length);
        };
    };

    [/,\./, /,!/, /,\?/, /!!/, /\.\./, /\?\?/, / \?/, / \./, / \!/].forEach(r => fullString.replace(r, ''));

    return fullString.charAt(0).toUpperCase() + fullString.slice(1, fullString.length) + ".";
};

module.exports = generate;