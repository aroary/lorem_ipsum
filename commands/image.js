const vscode = require('vscode');
const fs = require("fs");
const path = require("path");
const languages = fs.readdirSync(path.join(__dirname, '../languages')).filter(dir => dir.endsWith('.json')).map(dir => dir.split`.`.shift());
const generate = require("../utilities/lorem_ipsum");
const encode = require("../utilities/encodeSVG");

async function execute() {
    var language = vscode.workspace.getConfiguration('lorem_ipsum').get('language') || 'lat', languageData;
    if (language === "ctm") languageData = vscode.workspace.getConfiguration('lorem_ipsum').get('language.custom');
    else languageData = require(`../languages/${languages.includes(language) ? language : 'lat'}.json`);

    var width = await vscode.window.showInputBox({ validateInput: validate, ignoreFocusOut: true, placeHolder: "500", prompt: "width", });
    var height = await vscode.window.showInputBox({ validateInput: validate, ignoreFocusOut: true, placeHolder: "500", prompt: "height", });
    var lines = await vscode.window.showInputBox({ validateInput: validate, ignoreFocusOut: true, placeHolder: "1", prompt: "lines", });

    if (!width || !height) return;

    const text = [];
    while (text.length < lines) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` `);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" overflow="hidden" role="img" aria-label="lorem_ipsum">
    <title>lorem ipsum</title>
    <linearGradient id="s" x2="0" y2="100%"><stop offset="0%" stop-color="red" stop-opacity=".75"/><stop offset="100%" stop-color="blue" stop-opacity=".75"/></linearGradient>
    <clipPath id="r"><rect width="${width}" height="${height}" rx="10" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="${width}" height="${height}" fill="url(#s)"/></g>
    ${text.map((line, index) => `<text x="50%" y="${(100 / (parseInt(lines) + 1)) * (index + 1)}%" fill="#000" dominant-baseline="middle" text-anchor="middle" textLength="80%">${line}</text>`).join``}
</svg >`;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, "data:image/svg+xml," + encode(svg)));
    console.log(new Date().toISOString(), 'Generated image data URL');
};

const validate = (value) => Number.isNaN(value) ? "NaN" : null;

module.exports = { name: "image", execute };