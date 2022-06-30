const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of list items to generate', validateInput });
    count = parseInt(count);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            const text = [];
            while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).join` ` + ".");

            edit.replace(selection, text.join`\n`);

            console.log(new Date().toISOString(), 'Generated', count, 'list items');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "list", execute };