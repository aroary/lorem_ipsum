const vscode = require('vscode');
const canvas = require("canvas");
const random = require("../utilities/randomItem");

async function execute() {
    var language = vscode.workspace.getConfiguration('lorem_ipsum').get('language') || 'lat', languageData;
    if (language === "ctm") languageData = vscode.workspace.getConfiguration('lorem_ipsum').get('language.custom');
    else languageData = require(`../languages/${languages.includes(language) ? language : 'lat'}.json`);

    var width = await vscode.window.showInputBox({ validateInput: validate, ignoreFocusOut: true, placeHolder: "500", prompt: "width", });
    var height = await vscode.window.showInputBox({ validateInput: validate, ignoreFocusOut: true, placeHolder: "500", prompt: "height", });
    width = parseInt(width) || 500;
    height = parseInt(height) || 500;

    const img = canvas.createCanvas(width, height, "pdf");
    const ctx = img.getContext("2d");
    ctx.textAlign = "center";
    ctx.font = vscode.workspace.getConfiguration("editor", 1).get("fontFamily")[0] || "Ariel";
    ctx.fillText(languageData.start, width / 2, height / 2, width);

    img.toDataURL("image/png");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, img.toDataURL("image/png")));
    console.log(new Date().toISOString(), 'Generated image data URL');
};

const validate = (value) => Number.isNaN(value) ? "NaN" : null;

module.exports = { name: "image", execute };