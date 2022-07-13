const vscode = require('vscode');
const https = require('https');
const getLanguageData = require("../utilities/getLanguageData")

function execute() {
    https.request("https://aroary.com/lorem_ipsum/languages/languages.csv", res => {
        var data = "";
        res.on('data', chunk => data += chunk);
        res.on("end", () => vscode.window.showQuickPick(data.split`,`, {
            ignoreFocusOut: true,
            placeHolder: "Language",
            title: "Select a language"
        }).then(language => {
            // Success and fail are handled within `getLanguageData`.
            if (language && vscode.workspace.name) getLanguageData(language);
            else console.log(new Date().toISOString(), 'Language update failed');
        }));
    }).on('error', error => {
        console.log(new Date().toISOString(), error);
        vscode.window.showErrorMessage(error.message);
    }).end();
};

module.exports = { name: "language", execute };