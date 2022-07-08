const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of sentences to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, new Array(count).fill(undefined).map(() => generate(Math.floor(Math.random() * 4) + 16).join` ` + ".").join` `);

            console.log(new Date().toISOString(), 'Generated', count, 'sentences');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "sentence", execute };