const vscode = require('vscode');
const fs = require("fs");
const languages = fs.readdirSync('../languages').filter(file => file.split`.`.pop() === "js").map(file => file.split`.`.shift());

const validateInput = value => languages.includes(value) ? null : "Invalid ISO 639-2 Language Code";

async function execute() {
    const language = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Language', validateInput });
    if (language) {
        vscode.workspace.getConfiguration('lorem_ipsum').update('language', language);
        vscode.window.showInformationMessage(`Language updated to ${language}`);
        console.log(new Date().toISOString(), 'Language updated to', language);
    } else console.log(new Date().toISOString(), 'Language update failed');

};

module.exports = { name: "NAME", execute };