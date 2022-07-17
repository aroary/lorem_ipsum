const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    const type = await vscode.window.showQuickPick([
        "byte",
        "word",
        "sentance",
        "paragraph",
        "page",
        "code"
    ], {
        ignoreFocusOut: true,
        matchOnDescription: true,
        title: "Type to generate",
        placeHolder: "Type",
    });
    if (!type) return;

    var count = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: 'Number of type to generate',
        validateInput: value => parseInt(value) > 1 ? null : "Please enter a number greater than one"
    });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, generate[type](count));
            console.log(new Date().toISOString(), `Generated ${count} ${type}s`);
        });
    });
};

module.exports = { name: "text", execute };