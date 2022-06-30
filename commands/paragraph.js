const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of paragraphs to generate', validateInput });
    count = parseInt(count);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            const text = [];
            for (let j = 0; j < count; j++) {
                for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).join` ` + ".");
                text.push("\n");
            };

            edit.replace(selection, text.join` `.split("\n").map(v => v.trim()).join("\n").trim());

            console.log(new Date().toISOString(), 'Generated', count, 'paragraphs');
        });
    });
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "paragraph", execute };