const vscode = require('vscode');
const sharp = require('sharp');
const path = require("path");
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');
    const width = config.get('image-width');
    const height = config.get('image-height');
    const lines = config.get('image-lines');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" overflow="hidden" role="img" aria-label="lorem_ipsum">
            <title>lorem ipsum</title>
            <rect width="100%" height="100%" fill="${config.get("image-background")}"/>
            ${new Array(lines).fill(undefined).map(() => generate(5).join` `).map((line, index) => `<text x="50%" y="${(100 / (parseInt(lines) + 1)) * (index + 1)}%" fill="#000" dominant-baseline="middle" text-anchor="middle" textLength="80%">
                ${line}
            </text>`).join``}
        </svg>
    `;
    const format = vscode.workspace.getConfiguration('lorem_ipsum').get('image');
    const file = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, config.get('image-output'), `./${new Date().getTime()}.${format}`));

    if (vscode.workspace.name) sharp(Buffer.from(svg))[format]().toBuffer().then(buffer => vscode.workspace.fs.writeFile(file, buffer).then(() => {
        console.log(new Date().toISOString(), "Generated", file.path);
        vscode.window.showInformationMessage(`Image of ${width}.${height}.${format} saved to ${file.path}`);
        vscode.window.showTextDocument(file);
    })).catch(e => console.error(new Date().toISOString(), e));
    else console.log(new Date().toISOString(), "No workspace open");
};

module.exports = { name: "image", execute };