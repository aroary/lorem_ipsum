/*******************************************************
 * @file lorem ipsum extension for visual studios code *
 * @copyright (c) 2021 aroary                          *
 * @license MIT                                        *
 *******************************************************/

const vscode = require('vscode');
const fs = require('fs');

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log(new Date().toISOString(), 'extension activating');

    fs.readdirSync(__dirname + "/commands").filter(file => file.split`.`.pop() === "js").forEach(file => {
        const command = require(`./commands/${file}`);
        console.log(new Date().toISOString(), `registering command ${command.name} from ${file}`);
        context.subscriptions.push(vscode.commands.registerCommand('lorem_ipsum.' + command.name, command.execute));
    });

    console.log(new Date().toISOString(), 'lorem_ipsum extension activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() {
    console.log(new Date().toISOString(), "lorem_ipsum extension deactivating");
    console.log(new Date().toISOString(), "lorem_ipsum extension deactivated");
};

module.exports = { activate, deactivate };