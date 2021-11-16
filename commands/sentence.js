const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    var text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `));
    console.log(`Generated ${count} sentences`);
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : null;

module.exports = { name: "sentence", execute };