const vscode = require('vscode');
const fs = require('fs');

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log(new Date().toISOString(), 'lorem_ipsum extention activating');

    fs.readdirSync(__dirname + "/commands", { withFileTypes: true })
        .filter(file => file.name.split`.`.pop() === "js")
        .forEach(file => {
            const command = require(`./commands/${file.name}`);
            console.log(new Date().toISOString(), `registering command ${command.name} from ${file.name}`);
            context.subscriptions.push(vscode.commands.registerCommand('lorem_ipsum.' + command.name, command.execute));
        });

    console.log(new Date().toISOString(), 'lorem_ipsum extention activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() {
    console.log(new Date().toISOString(), "lorem_ipsum extention deactivated");
};

module.exports = { activate, deactivate };