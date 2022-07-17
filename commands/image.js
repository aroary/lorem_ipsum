const vscode = require('vscode');
const sharp = require('sharp');
const path = require("path");
const generate = require("../utilities/generate").word;

async function execute() {
    if (!vscode.workspace.name) return vscode.window.showErrorMessage("Please open a workspace before using this command.");

    var ratio = await vscode.window.showQuickPick(["1:1", "2:3", "4:5", "5:6", "5:7", "16:9", "11:14"], { ignoreFocusOut: true, placeHolder: "Ratio", title: "Image ratio" });
    if (!ratio) return;
    ratio = ratio.split(":").map(Number);

    const [height, width] = [500, Math.round(500 / (ratio[0] / ratio[1]))];
    const lines = 20; // Determined to be acceptable.

    const background = await vscode.window.showInputBox({ placeHolder: "CSS Color", ignoreFocusOut: true, title: "Background color", value: "white", validateInput: colorValidation });
    if (!background) return;

    const foreground = await await vscode.window.showInputBox({ placeHolder: "CSS Color", ignoreFocusOut: true, title: "Foreground color", value: "black", validateInput: colorValidation });
    if (!foreground) return;

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" overflow="hidden" role="img" aria-label="lorem_ipsum">
            <title>lorem ipsum</title>
            <rect width="100%" height="100%" fill="${background}"/>
            ${new Array(lines).fill(undefined).map((line, index) => `<text x="50%" y="${(100 / (lines + 1)) * (index + 1)}%" fill="${foreground}" font-family="${vscode.workspace.getConfiguration("editor").get("fontFamily")}" dominant-baseline="middle" text-anchor="middle" textLength="80%">
                ${generate(20)}
            </text>`).join``}
        </svg>
    `;

    const format = await vscode.window.showQuickPick(["png", "jpg", "webp", "tiff", "bmp", "gif"], { ignoreFocusOut: true, placeHolder: "Format", title: "Image format" });
    if (!format) return;

    var dir;
    if (vscode.window.activeTextEditor) dir = vscode.window.activeTextEditor.document.uri.fsPath.split("\\").slice(0, -1).join("\\");
    else dir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const file = vscode.Uri.file(path.join(dir, `./${new Date().getTime()}.${format}`));

    if (vscode.workspace.name) sharp(Buffer.from(svg))[format]().toBuffer().then(buffer => vscode.workspace.fs.writeFile(file, buffer).then(() => {
        console.log(new Date().toISOString(), "Generated", file.path);
        vscode.window.showInformationMessage(`Image of ${width}.${height}.${format} saved to ${file.path}`);
        vscode.window.showTextDocument(file);
    })).catch(e => console.error(new Date().toISOString(), e));
    else console.log(new Date().toISOString(), "No workspace open");
};

// Allows for color names, hex codes in formats #RGB, #RRGGBB, #RGBA, #RRGGBBAA, rgb and hsl colors in formats (R, G, B), (R G B), (R%, G%, B%), (R% G% B%), (R, G, B, A), (R G B A), (R%, G%, B%, A%), (R% G% B% A%),
const colorValidation = color => /^[a-z]{3,20}$/i.test(color) || /^#(([0-9a-f]{3}){1,2}|([0-9a-f]{4}){1,2})$/i.test(color) || /^(rgb|hsl)a?\((\s*\d*\.?\d+%?\s*(,\s*)?){3,4}\)$/i.test(color) ? null : "Invalid color"

module.exports = { name: "image", execute };