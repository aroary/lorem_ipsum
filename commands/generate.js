const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    const res = await vscode.window.showInputBox({ placeHolder: 'Number of words to generate' });

    const n = parseInt(res);
    if (!n) return vscode.window.showInformationMessage('You must enter a number of words to generate.');

    vscode.window.showInformationMessage('Generating ' + n + ' words...');

    // Add the "lorim ipsum" text to the cursor position
    const editor = vscode.window.activeTextEditor;
    const text = generate(n);
    editor.edit(edit => {
        edit.insert(editor.selection.active, text);
    });

    console.log('Generated ' + n + ' words.');
};

module.exports = { name: "generate", execute };