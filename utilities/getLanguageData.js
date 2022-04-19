const https = require('https');
const vscode = require("vscode");

function getLanguageData(language = null) {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');

    if (language) {
        const endpoint = `https://aroary.github.io/lorem_ipsum/languages/${language}.json`;
        console.log(new Date().toISOString(), "Getting", endpoint);
        https.request(endpoint, res => {
            var words = "";
            res.on('data', data => words += data);
            res.on("end", () => config.update("language", words, false).then(() => {
                vscode.window.showInformationMessage(`Language set to ${language}`);
                console.log(new Date().toISOString(), 'Language updated to', language);
            }));
        }).on('error', error => {
            console.log(new Date().toISOString(), error);
            vscode.window.showErrorMessage(error.message);
        });
        return config.get('language');
    } else return config.get('language') || require("./default.json");
};

module.exports = getLanguageData;