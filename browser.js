const vscode = require('vscode');

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

module.exports = { activate, deactivate };