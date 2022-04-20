const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, new Array(count).fill(undefined).map(() => new Array(Math.floor(Math.random() * 3) + 5).fill(undefined).map(() => generate(Math.floor(Math.random() * 6) + 16).join` ` + ".").join` ` + "\n").join`\n`));
    console.log(new Date().toISOString(), 'Generated', count, 'pages');
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "page", execute };