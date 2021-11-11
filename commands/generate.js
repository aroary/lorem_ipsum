const vscode = require('vscode');

async function execute() {
    const res = await vscode.window.showInputBox({
        placeholder: 'hi'
    });

    const n = parseInt(res);
    if (!n)
        return vscode.window.showInformationMessage('You must enter a number of words to generate.');

    vscode.window.showInformationMessage('Generating ' + n + ' words...');
}

module.exports = { name: "generate", execute };