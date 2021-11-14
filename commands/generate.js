const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var c = await vscode.window.showInputBox({ ignoreFocusOut, placeHolder: 'Number of words to generate', validateInput });
    c = parseInt(c);

    if (!c) return vscode.window.showInformationMessage('You must enter a number of words to generate.');

    vscode.window.showInformationMessage('Generating ' + n + ' words...').then(() => {
        const editor = vscode.window.activeTextEditor;
        const text = generate(n);
        editor.edit(edit => {
            edit.insert(editor.selection.active, text);
        });

        console.log('Generated ' + n + ' words.');
    });
};

function validateInput(value) {
    return isNaN(value) ? 'Please enter a number' : null;
};

module.exports = { name: "generate", execute };