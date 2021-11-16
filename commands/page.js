const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    count = parseInt(count);

    var text = [];
    for (let k = 0; k < count; k++) {
        for (let j = 0; j < Math.floor(Math.random() * 3) + 5; j++) {
            for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");
            text.push("\n");
        };
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n")));
    console.log(`Generated ${count} pages`);
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : null;

module.exports = { name: "page", execute };