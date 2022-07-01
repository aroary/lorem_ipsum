const vscode = require('vscode');
const generate = require("../utilities/lorem_ipsum");

async function execute() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of list items to generate', validateInput });
    count = parseInt(count);

    var text = generate(count);
    switch (vscode.window.activeTextEditor.document.languageId) {
        case "plaintext":
            text = text.join`\n`;
            break;
        case "xml":
        case "html":
            text = `<ul>\n\t<li>${text.join`</li>\n\t<li>`}</li>\n</ul>`;
            break;
        case "php":
            text = `array("${text.join`", "`}")`;
            break;
        case "javascript":
        case "typescript":
        case "json":
            text = `[\n\t"${text.join`",\n\t"`}"\n]`;
            break;
        case "go":
        case "java":
        case "cpp":
        case "c":
            text = `{"${text.join`", "`}"}`;
            break;
        case "sql":
            text = `ARRAY["${text.join`", "`}"]`;
            break;
        case "yaml", "markdown":
            text = `- ${text.join`\n- `}`;
            break;
        case "ini":
            text = `array[] = ${text.join`\narray[] = `}`;
            break;
        case "shellscript":
            text = `(${text.join` `})`;
            break;
        case "bat":
            text = `${text.join` `}`;
            break;
        case "ruby":
            text = `%w("${text.join`, `}")`;
            break;
        case "haskell":
        case "rust":
        case "python":
            text = `["${text.join`", "`}"]`;
            break;
        case "perl":
            text = `("${text.join`", "`}")`;
            break;
        case "csharp":
            text = `{ "${text.join`", "`}"; } `;
            break;
        case "powershell":
            text = `@("${text.join`", "`}")`;
            break;
        default:
            text = text.join`\n`;
            break;
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text));
    console.log(new Date().toISOString(), 'Generated', count, 'list items');
};

const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

module.exports = { name: "code", execute };