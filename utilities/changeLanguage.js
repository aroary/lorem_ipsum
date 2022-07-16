const https = require('https');
const vscode = require("vscode");

/**
 * @descrition Change the language of the text generated.
 * @param {string} language - The language to download.
 * @returns {Array<string>} The language data.
 */
function changeLanguage(language) {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');
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
};

module.exports = changeLanguage;