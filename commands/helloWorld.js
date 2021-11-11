const vscode = require('vscode');

function execute() {
    vscode.window.showInformationMessage('Hello World!');
}

module.exports = { name: 'helloworld', execute };