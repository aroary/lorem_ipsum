const vscode = require('vscode');
const fs = require("fs");
const path = require("path");
const codes = require("../utilities/codes.json");

const languages = fs
    .readdirSync(path.join(__dirname, '../languages'))
    .filter(file => file.split`.`.pop() === "json")
    .map(file => file.split`.`.shift().toLowerCase());

/**
 * @param {string} value - User input
 * @returns {string|null} - Error message
 */
const validateInput = value => {
    if (!value) return null;
    else if (value.length !== 3) return 'Language code must be 3 characters long';
    else if (languages.includes(value.toLowerCase())) return null;
    else if (value.toLowerCase() === 'ctm') return null;
    else if (codes.includes(value.toLowerCase())) return "Language code is not supported";
    else return "Invalid ISO 639-2 Language Code";
};

function execute() {
    vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: 'Language',
        validateInput,
        prompt: 'Enter a language code',
        value: 'lat',
        valueSelection: undefined
    }, undefined).then(language => {
        if (language && vscode.workspace.name) {
            vscode.workspace.getConfiguration('lorem_ipsum').update('language', language, false).then(() => {
                vscode.window.showInformationMessage(`Language set to ${language}`);
                console.log(new Date().toISOString(), 'Language updated to', language);
            });
        } else console.log(new Date().toISOString(), 'Language update failed');
    });
};

module.exports = { name: "language", execute };