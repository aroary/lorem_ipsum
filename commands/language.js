const vscode = require('vscode');
const https = require('https');
const getLanguageData = require("../utilities/getLanguageData")

function execute() {
    https.request("https://aroary.com/lorem_ipsum/languages/languages.csv", res => {
        var data = "";
        console.log(2);
        res.on('data', chunk => data += chunk);
        res.on("end", () => vscode.window.showQuickPick(data.split`,`, {
            ignoreFocusOut: true,
            placeHolder: "Language",
            title: "Select a language"
        }).then(language => {
            if (language && vscode.workspace.name) getLanguageData(language);
            else console.log(new Date().toISOString(), 'Language update failed');
        }));
    }).on('error', error => {
        console.log(new Date().toISOString(), error);
        vscode.window.showErrorMessage(error.message);
    }).end();
    console.log(1);
};

module.exports = { name: "language", execute };