const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum").paragraph;

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of paragraphs to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, generate(count));
            console.log(new Date().toISOString(), 'Generated', count, 'paragraphs');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "paragraph", execute };