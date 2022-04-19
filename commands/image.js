const vscode = require('vscode');
const sharp = require('sharp');
const path = require("path");
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    const width = vscode.workspace.getConfiguration('lorem_ipsum').get('image.width') || 500;
    const height = vscode.workspace.getConfiguration('lorem_ipsum').get('image.height') || 500;
    const lines = vscode.workspace.getConfiguration('lorem_ipsum').get('image.lines') || 4;

    const text = [];
    while (text.length < lines) text.push(generate(Math.floor(Math.random() * 6) + 16).join` `);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" overflow="hidden" role="img" aria-label="lorem_ipsum"><title>lorem ipsum</title><clipPath id="r"><rect width="${width}" height="${height}" rx="10" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="${width}" height="${height}" fill="transparent"/></g>${text.map((line, index) => `<text x="50%" y="${(100 / (parseInt(lines) + 1)) * (index + 1)}%" fill="#000" dominant-baseline="middle" text-anchor="middle" textLength="80%">${line}</text>`).join``}</svg>`;
    const format = vscode.workspace.getConfiguration('lorem_ipsum').get('image') || "png";
    const file = vscode.Uri.file(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, vscode.workspace.getConfiguration('lorem_ipsum').get('image.output') || "./", `./l_i.${Math.floor(Math.random() * 1000)}.${format}`));

    // vscode.workspace.name

    if (vscode.workspace.name) sharp(Buffer.from(svg))[format]().toBuffer().then(buffer => vscode.workspace.fs.writeFile(file, buffer).then(() => {
        console.log(new Date().toISOString(), "Generated", file.path);
        vscode.window.showInformationMessage(`Image of ${width}.${height}.${format} saved to ${file.path}`);
        vscode.window.showTextDocument(file);
    })).catch(e => console.error(new Date().toISOString(), e));
    else console.log(new Date().toISOString(), "No workspace open");
};

module.exports = { name: "image", execute };