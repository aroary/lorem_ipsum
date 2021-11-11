const vscode = require('vscode');

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

    // Hello World command
    let disposable = vscode.commands.registerCommand('lorem_ipsum.helloworld', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() { }

module.exports = { activate, deactivate };