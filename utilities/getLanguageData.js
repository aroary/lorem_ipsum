const https = require('https');
const vscode = require("vscode");

function getLanguageData(language = null) {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');

    if (language) {
        const endpoint = `https://aroary.com/lorem_ipsum/languages/${language}.json`;
        console.log(new Date().toISOString(), "Getting", endpoint);
        https.request(endpoint, res => {
            var data = "";
            res.on('data', chunk => data += chunk);
            res.on("end", () => config.update("language", JSON.parse(data), false).then(() => {
                vscode.window.showInformationMessage(`Language set to ${language}`);
                console.log(new Date().toISOString(), 'Language updated to', language);
            }));
        }).on('error', error => {
            console.log(new Date().toISOString(), error);
            vscode.window.showErrorMessage(error.message);
        }).end();
        return config.get('language');
    } else return config.get('language') || require("./default.json");
};

module.exports = getLanguageData;