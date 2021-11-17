const vscode = require('vscode');

function execute() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();
    const words = text.split(/\s+/g).length;
    const chars = text.length;
    const lines = editor.document.lineCount;

    const data = `${editor.document.fileName}\n\twords: ${words}\n\tcharachters: ${chars}\n\tlines: ${lines}`;
    vscode.window.showInformationMessage(data);
    console.log(data);
};

module.exports = { name: "contents", execute };