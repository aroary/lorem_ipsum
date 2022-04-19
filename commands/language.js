const vscode = require('vscode');
const getLanguageData = require("../utilities/getLanguageData")

/**
 * @param {string} value - User input
 * @returns {string|null} - Error message
 */
const validateInput = value => {
    if (value.length !== 3) return 'Language code must be 3 characters long';
    else return null;
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
        if (language && vscode.workspace.name) getLanguageData(language);
        else console.log(new Date().toISOString(), 'Language update failed');
    });
};

module.exports = { name: "language", execute };