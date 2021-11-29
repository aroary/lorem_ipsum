const vscode = require('vscode'); // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file

async function byte() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of bytes to generate', validateInput });
    count = parseInt(count);

    var text = [];
    while (text.join` `.length < count) text.push(generate(9).slice(8)[0]);

    var overflow = text.join` `.length - count;
    text = text.join` `.slice(0, -overflow);

    if (text[text.length - 1] === " ") text = text.slice(0, -1) + random("abcdefghijklmnopqrstuvwxyz".split``);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text));

    console.log(new Date().toISOString(), `Generated ${count} bytes`);
};

async function word() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, generate(count).join` `));

    console.log(new Date().toISOString(), `Generated ${count} words`);
};

async function sentance() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of sentences to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    var text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `));
    console.log(new Date().toISOString(), `Generated ${count} sentences`);
};

async function paragraph() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of paragraphs to generate', validateInput });
    count = parseInt(count);

    var text = [];
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), `Generated ${count} paragraphs`);
};

async function page() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
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
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), `Generated ${count} pages`);
};

async function list() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of list items to generate', validateInput });
    count = parseInt(count);

    var text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join`\n`));
    console.log(new Date().toISOString(), `Generated ${count} list items`);
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

const commands = { byte, word, sentance, paragraph, page, list };

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log(new Date().toISOString(), 'lorem_ipsum extention activating');
    console.log(new Date().toISOString(), 'lorem_ipsum extention activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() {
    console.log(new Date().toISOString(), "lorem_ipsum extention deactivating");
    console.log(new Date().toISOString(), "lorem_ipsum extention deactivated");
};


module.exports = { activate, deactivate }; // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file