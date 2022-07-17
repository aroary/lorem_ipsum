const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum").page;

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, generate(count));
            console.log(new Date().toISOString(), 'Generated', count, 'pages');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 || value < 1 ? 'Number must be between 1 and 100000' : null;

module.exports = { name: "page", execute };