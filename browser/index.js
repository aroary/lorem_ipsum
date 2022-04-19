/***************************************************************
 * @file lorem ipsum browser extension for https://github.dev/ *
 * @copyright (c) 2021 aroary                                  *
 * @license MIT                                                *
 ***************************************************************/

const vscode = require('vscode'); // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file

// Default language
const lat = [
    "maxime",
    "mollitia",
    "molestiae",
    "quas",
    "vel",
    "repudiandae",
    "consequuntur",
    "voluptatum",
    "laborum",
    "numquam",
    "blanditiis",
    "harum",
    "quisquam",
    "eius",
    "sed",
    "odit",
    "fugiat",
    "iusto",
    "fuga",
    "praesentium",
    "optio",
    "eaque",
    "rerum",
    "Provident",
    "similique",
    "accusantium",
    "nemo",
    "autem",
    "Veritatis",
    "obcaecati",
    "tenetur",
    "iure",
    "earum",
    "ut",
    "molestias",
    "voluptate",
    "aliquam",
    "nihil",
    "eveniet",
    "aliquid",
    "culpa",
    "officia",
    "aut",
    "Impedit",
    "sit",
    "quaerat",
    "nesciunt",
    "ipsum",
    "debitis",
    "reprehenderit",
    "quia",
    "quo",
    "neque",
    "Ipsa",
    "eos",
    "sapiente",
    "officiis",
    "at",
    "excepturi",
    "expedita",
    "sint",
    "Sed",
    "quibusdam",
    "recusandae",
    "alias",
    "error",
    "adipisci",
    "amet",
    "Perspiciatis",
    "dolorem",
    "Officiis",
    "voluptates",
    "a",
    "cumque",
    "velit",
    "tempora",
    "Sit",
    "fugit",
    "doloribus",
    "temporibus",
    "enim",
    "commodi",
    "libero",
    "magni",
    "deleniti",
    "quod",
    "quam",
    "hic",
    "doloremque",
    "provident",
    "consectetur",
    "veniam",
    "ad",
    "omnis",
    "saepe",
    "voluptas",
    "pariatur",
    "est",
    "explicabo",
    "dolorum",
    "eligendi",
    "cupiditate",
    "maiores",
    "labore",
    "suscipit",
    "Nulla",
    "placeat",
    "Voluptatem",
    "non",
    "architecto",
    "ab",
    "laudantium",
    "modi",
    "minima",
    "sunt",
    "esse",
    "totam",
    "ratione",
    "exercitationem",
    "Possimus",
    "quis",
    "quasi",
    "qui",
    "corporis"
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

/**
 * @description Generate random text.
 * @param {number} n - The number of words to generate.
 * @returns {array<string>} An array of random text.
 */
function generate(n) {
    const languageData = getLanguageData();
    const generated = [];
    while (generated.length < n) generated.push(randomItem(languageData));
    return generated;
};

/**
 * @description Get the language data or downlaod a language.
 * @param {string|null} language - The language to download.
 * @returns {array<string>} An array of random words from a language.
 */
function getLanguageData(language = null) {
    const config = vscode.workspace.getConfiguration('lorem_ipsum');

    if (language) {
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
    } else return config.get('language') || lat;
};

/**
 * @description Generate a random byte.
 */

async function byte() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of bytes to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    var text = [];
    while (text.join` `.length < count) text.push(generate(1)[0]);
    text = text.join` `.slice(0, -(text.join` `.length - count));
    if (text[text.length - 1] === " ") text = text.slice(0, -1) + random("abcdefghijklmnopqrstuvwxyz".split``);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text));

    console.log(new Date().toISOString(), 'Generated', count, 'bytes');
};

/**
 * @description Generate a random word.
 */
async function word() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, generate(count).join` `));

    console.log(new Date().toISOString(), 'Generated', count, 'words');
};

/**
 * @description Generate a random sentence.
 */
async function sentence() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of sentences to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `));
    console.log(new Date().toISOString(), 'Generated', count, 'sentences');
};

/**
 * @description Generate a random paragraph.
 */
async function paragraph() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of paragraphs to generate', validateInput });
    count = parseInt(count);

    const text = [];
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).join` ` + ".");
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), 'Generated', count, 'paragraphs');
};

/**
 * @description Generate a random pageful text.
 */
async function page() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
    count = parseInt(count);

    const text = [];
    for (let k = 0; k < count; k++) {
        for (let j = 0; j < Math.floor(Math.random() * 3) + 5; j++) {
            for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).join` ` + ".");
            text.push("\n");
        };
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), 'Generated', count, 'pages');
};

/**
 * @description Generate a random list.
 */
async function code() {
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
    vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: 'Language',
        validateInput: value => value.length !== 3 ? 'Language code must be 3 characters long' : null,
        prompt: 'Enter a language code',
        value: 'lat',
        valueSelection: undefined
    }, undefined).then(language => {
        if (language && vscode.workspace.name) getLanguageData(language);
        else console.log(new Date().toISOString(), 'Language update failed');
    });
};

const commands = [
    { execute: byte, name: "byte" },
    { execute: word, name: "word" },
    { execute: sentence, name: "sentence" },
    { execute: paragraph, name: "paragraph" },
    { execute: page, name: "page" },
    { execute: code, name: "code" },
    { execute: image, name: "image" },
    { execute: language, name: "language" }
];

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