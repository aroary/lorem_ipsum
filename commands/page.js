const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
    count = parseInt(count);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, new Array(count).fill(undefined).map(() => new Array(Math.floor(Math.random() * 3) + 5).fill(undefined).map(() => new Array(Math.floor(Math.random() * 3) + 5).fill(undefined).map(() => generate(Math.floor(Math.random() * 4) + 16).join` ` + ".").join` `).join`\n`).join`\n\n`);


            console.log(new Date().toISOString(), 'Generated', count, 'pages');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "page", execute };