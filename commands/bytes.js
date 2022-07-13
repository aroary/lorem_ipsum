const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");
const random = require("../utilities/randomItem");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of bytes to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            var text = [];
            while (text.join` `.length < count) text.push(generate(1)[0]);
            text = text.join` `.slice(0, -(text.join` `.length - count));
            if (text[text.length - 1] === " ") text = text.slice(0, -1) + random("abcdefghijklmnopqrstuvwxyz".split``);

            edit.replace(selection, text);

            console.log(new Date().toISOString(), 'Generated', count, 'bytes');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 || value < 1 ? 'Number must be between 1 and 100000' : null;

module.exports = { name: "byte", execute };