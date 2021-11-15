const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var c = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    c = parseInt(c);

    if (!c) return vscode.window.showInformationMessage('You must enter a number of words to generate.');

    vscode.window.showInformationMessage('Generating ' + c + ' words...');

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        edit.insert(editor.selection.active, generate(c));
    });

    console.log('Generated ' + c + ' words.');
};

function validateInput(value) {
    return isNaN(value) ? 'Please enter a number' : null;
};

module.exports = { name: "generate", execute };