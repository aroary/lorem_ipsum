const vscode = require('vscode');
const fs = require('fs');

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
const activate = (context) => {
    console.log('lorem_ipsum extention activating');

    fs.readdirSync(__dirname + "/commands", { withFileTypes: true })
        .filter(file => file.name.split`.`.pop() === "js")
        .forEach(file => {
            console.log(`registering command ${file.name}`);

            const command = require(`./commands/${file.name}`);

            const disposable = vscode.commands.registerCommand('lorem_ipsum.' + command.name, command.execute);

            console.log(command.name);
            context.subscriptions.push(disposable);
        });

    console.log('lorem_ipsum extention activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() { };

module.exports = { activate, deactivate };