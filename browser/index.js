/**************************************************************
 * @file lorem ipsum browser extension for visual studio code *
 * @copyright (c) 2021 aroary                                 *
 * @license MIT                                               *
 **************************************************************/

const vscode = require('vscode'); // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file

/**
 * @description Change the language of the text generated.
 * @param {string} language - The language to download.
 * @returns {Array<string>} The language data.
 */
function changeLanguage(language) {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');
    const endpoint = `https://aroary.com/lorem_ipsum/languages/${language}.json`;
    console.log(new Date().toISOString(), "Getting", endpoint);
    const request = new XMLHttpRequest();
    request.open('GET', endpoint, true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            config.update("language", JSON.parse(request.responseText), false).then(() => {
                vscode.window.showInformationMessage(`Language set to ${language}`);
                console.log(new Date().toISOString(), 'Language updated to', language);
            });
            return config.get('language');
        } else {
            console.log(new Date().toISOString(), `Error ${request.status}: ${request.statusText}`);
            vscode.window.showErrorMessage(`Error ${request.status}: ${request.statusText}`);
        }
    };
    request.onerror = () => {
        console.log(new Date().toISOString(), request.statusText);
        vscode.window.showErrorMessage('request.statusText');
    };
    return config.get('language');
};

const types = [byte, word, sentence, paragraph, page, code]

/**
 * @description Generate a text.
 */
async function text() {
    const type = await vscode.window.showQuickPick([
        "byte",
        "word",
        "sentence",
        "paragraph",
        "page",
        "code"
    ], {
        ignoreFocusOut: true,
        matchOnDescription: true,
        title: "Type to generate",
        placeHolder: "Type",
    });
    if (!type) return;

    var count = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: 'Number of type to generate',
        validateInput: value => parseInt(value) > 1 ? null : "Please enter a number greater than one"
    });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => {
        editor.selections.forEach(selection => {
            edit.replace(selection, types[type](count));
            console.log(new Date().toISOString(), `Generated ${count} ${type}s`);
        });
    });
};

/**
 * @description Generate an image.
 */
async function image() {
    console.log(new Date().toISOString(), 'Generating image');
    vscode.window.showErrorMessage('Image generation is not available in the browser yet');
};

/**
 * @description Change the language of the text.
 */
function language() {
    const endpoint = "https://aroary.com/lorem_ipsum/languages/languages.csv";
    const request = new XMLHttpRequest();
    request.open("GET", endpoint, true);
    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            vscode.window.showQuickPick(request.responseText.split`,`, {
                ignoreFocusOut: true,
                placeHolder: "Language",
                title: "Select a language"
            }).then(language => {
                if (language && vscode.workspace.name) changeLanguage(language);
                else console.log(new Date().toISOString(), 'Language update failed');
            });
        } else {
            console.log(new Date().toISOString(), request.status, request.statusText);
            vscode.window.showErrorMessage('Error getting languages');
        }
    };
    request.onerror = () => {
        console.log(new Date().toISOString(), 'Error getting languages');
        vscode.window.showErrorMessage('Error getting languages');
    };
    request.send();
};

const commands = [
    { execute: text, name: "text" },
    { execute: image, name: "image" },
    { execute: language, name: "language" }
];

/**
 * @description Generate random text.
 * @param {number} n - The number of words to generate.
 * @returns {array<string>} An array of random text.
 */
function generate(n) {
    const data = vscode.workspace.getConfiguration('lorem_ipsum').get('language');
    return new Array(n).fill(undefined).map(() => data[Math.floor(Math.random() * data.length)]);
};

function byte(count) {
    var text = [];
    while (text.join` `.length < count) text.push(generate(1)[0]);
    text = text.join` `.slice(0, -(text.join` `.length - count));
    if (text[text.length - 1] === " ") text = text.slice(0, -1) + ("abcdefghijklmnopqrstuvwxyz".split``[Math.random() * 26]);
    return text;
};

function word(count) {
    return generate(count).join` `;
};

function sentence(count) {
    return new Array(count).fill(undefined).map(() => word(Math.floor(Math.random() * 4) + 16) + ".").join` `;
};

function paragraph(count) {
    return new Array(count).fill(undefined).map(() => sentence(Math.floor(Math.random() * 3) + 5)).join`\n`;
};

function page(count) {
    return new Array(count).fill(undefined).map(() => paragraph(Math.floor(Math.random() * 3) + 5)).join`\n\n`;
};

function code(count) {
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

    return text;
}

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log(new Date().toISOString(), 'lorem_ipsum extension activating');

    commands.forEach(command => {
        console.log(new Date().toISOString(), `registering command ${command.name}`);
        context.subscriptions.push(vscode.commands.registerCommand('lorem_ipsum.' + command.name, command.execute));
    });

    console.log(new Date().toISOString(), 'lorem_ipsum extension activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() {
    console.log(new Date().toISOString(), "lorem_ipsum extension deactivating");
    console.log(new Date().toISOString(), "lorem_ipsum extension deactivated");
};

module.exports = { activate, deactivate }; // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file