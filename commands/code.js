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
        case "html":
            text = `<ul>\n<li>${text.join`</li>\n<li>`}</li>\n</ul>`;
            break;
        case "php":
            text = `array("${text.join`", "`}")`;
            break;
        case "json":
            text = `[\n"${text.join`",\n\t"`}"\n]`;
            break;
        case "c":
            text = `{"${text.join`", "`}"}`;
            break;
        case "cpp":
            text = `{"${text.join`", "`}"}`;
            break;
        case "java":
            text = `{"${text.join`", "`}"}`;
            break;
        case "javascript":
            text = `[\n"${text.join`",\n\t"`}"\n]`;
            break;
        case "typescript":
            text = `[\n"${text.join`",\n\t"`}"\n]`;
            break;
        case "sql":
            text = `ARRAY["${text.join`", "`}"]`;
            break;
        case "xml":
            text = `<ul>\n<li>${text.join`</li>\n<li>`}</li>\n</ul>`;
            break;
        case "yaml":
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
        case "markdown":
            text = `- ${text.join`\n- `}`;
            break;
        case "ruby":
            text = `%w("${text.join`, `}")`;
            break;
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
        case "rust":
            text = `["${text.join`", "`}"]`;
            break;
        case "haskell":
            text = `["${text.join`", "`}"]`;
            break;
        case "go":
            text = `{"${text.join`", "`}"}`;
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