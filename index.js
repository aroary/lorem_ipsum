const vscode = require('vscode');

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */

const activate = (context) => {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

    // Hello World command
    let disposable = vscode.commands.registerCommand('lorem_ipsum.helloworld', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    const generateCommand = vscode.commands.registerCommand('lorem_ipsum.generate', async () => {
        const res = await vscode.window.showInputBox({
            placeholder: 'hi'
        });

        const n = parseInt(res);
        if (!n) 
            return vscode.window.showInformationMessage('You must enter a number of words to generate.');

        vscode.window.showInformationMessage('Generating ' + n + ' words...');
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(generateCommand);
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() { }

module.exports = { activate, deactivate };