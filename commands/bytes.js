const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");
const random = require("../utilities/randomItem");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of bytes to generate', validateInput });
    count = parseInt(count);

    var text = [];
    while (text.join` `.length < count) text.push(generate(9).slice(8)[0]);

    var overflow = text.join` `.length - count;
    text = text.join` `.slice(0, -overflow);

    if (text[text.length - 1] === " ") text = text.slice(0, -1) + random("abcdefghijklmnopqrstuvwxyz".split``);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text));

    console.log(`Generated ${count} bytes`);
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "byte", execute };