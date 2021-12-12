/***************************************************************
 * @file lorem ipsum browser extension for https://github.dev/ *
 * @copyright (c) 2021 aroary                                  *
 * @license MIT                                                *
 ***************************************************************/

const vscode = require('vscode'); // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file

// Languages
const languages = {
    lat: {
        start: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        words: ["maxime", "mollitia", "molestiae", "quas", "vel", "repudiandae", "consequuntur", "voluptatum", "laborum", "numquam", "blanditiis", "harum", "quisquam", "eius", "sed", "odit", "fugiat", "iusto", "fuga", "praesentium", "optio", "eaque", "rerum", "Provident", "similique", "accusantium", "nemo", "autem", "Veritatis", "obcaecati", "tenetur", "iure", "earum", "ut", "molestias", "voluptate", "aliquam", "nihil", "eveniet", "aliquid", "culpa", "officia", "aut", "Impedit", "sit", "quaerat", "nesciunt", "ipsum", "debitis", "reprehenderit", "quia", "quo", "neque", "Ipsa", "eos", "sapiente", "officiis", "at", "excepturi", "expedita", "sint", "Sed", "quibusdam", "recusandae", "alias", "error", "adipisci", "amet", "Perspiciatis", "dolorem", "Officiis", "voluptates", "a", "cumque", "velit", "tempora", "Sit", "fugit", "doloribus", "temporibus", "enim", "commodi", "libero", "magni", "deleniti", "quod", "quam", "hic", "doloremque", "provident", "consectetur", "veniam", "ad", "omnis", "saepe", "voluptas", "pariatur", "est", "explicabo", "dolorum", "eligendi", "cupiditate", "maiores", "labore", "suscipit", "Nulla", "placeat", "Voluptatem", "non", "architecto", "ab", "laudantium", "modi", "minima", "sunt", "esse", "totam", "ratione", "exercitationem", "Possimus", "quis", "quasi", "qui", "corporis"]
    },
    eng: {
        start: "the vehicle itself is pain",
        words: ["most", "resilience", "discomfort", "which", "or", "must", "be", "rejected", "follow", "pleasures", "snacks", "never", "flattery", "of", "these", "anyone", "his", "sed", "hate", "escape", "regular", "flight", "presents", "choice", "symptoms", "of", "things", "Provident", "something", "similar", "accusers", "nobody", "However", "Truth", "blinded", "bound", "right", "of", "them", "ut", "annoyances", "pleasure", "some", "nothing", "will", "come", "to", "pass", "something", "fault", "services", "or", "Impedes", "let", "it", "be", "seek", "don't", "know", "yourself", "debts", "condemn", "because", "where", "nor", "She", "them", "wise", "man", "offices", "at", "catch", "him", "unencumbered", "let", "them", "be", "But", "some", "accepted", "alias", "error", "obtain", "fun", "Encounter", "sorrow", "Duties", "pleasures", "a", "and", "as", "please", "times", "Let", "it", "be", "flees", "sorrows", "times", "for", "commodity", "free", "great", "soothes", "that", "how", "this", "pain", "and", "pain", "provident", "enhanced", "I", "will", "come", "to", "everyone", "often", "pleasure", "resultant", "it", "is", "explain", "pain", "to", "choose", "eagerness", "greater", "hard", "work", "welcomes", "None", "please", "Pleasure", "non", "architect", "ab", "cheering", "modi", "small", "are", "to", "be", "the", "whole", "story", "reason", "training", "We", "can", "who", "almost", "who", "body"]
    }
};

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const validateInput = value => isNaN(value) ? 'Please enter a number' : value > 100000 ? 'Number too high' : null;

function generate(n) {
    var language = vscode.workspace.getConfiguration('lorem_ipsum').get('language') || 'lat';
    if (!languages[language]) language = 'lat';

    const languageData = languages[language]
    const generated = languageData.start.split` `;

    if (n > 8) for (let i = 0; i < n - 8; i++) {
        var word = randomItem(languageData.words);
        while (word === generated[i - 1]) word = randomItem(languageData.words);

        generated.push(word);
    } else while (generated[n]) generated.pop();

    return generated;
};

async function byte() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of bytes to generate', validateInput });
    count = parseInt(count);

    var text = [];
    while (text.join` `.length < count) text.push(generate(9).slice(8)[0]);

    var overflow = text.join` `.length - count;
    text = text.join` `.slice(0, -overflow);

    if (text[text.length - 1] === " ") text = text.slice(0, -1) + random("abcdefghijklmnopqrstuvwxyz".split``);

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text));

    console.log(new Date().toISOString(), `Generated ${count} bytes`);
};

async function word() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of words to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, generate(count).join` `));

    console.log(new Date().toISOString(), `Generated ${count} words`);
};

async function sentence() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of sentences to generate', validateInput });
    count = parseInt(count);
    if (!count) return;

    var text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `));
    console.log(new Date().toISOString(), `Generated ${count} sentences`);
};

async function paragraph() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of paragraphs to generate', validateInput });
    count = parseInt(count);

    var text = [];
    for (let j = 0; j < count; j++) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), `Generated ${count} paragraphs`);
};

async function page() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of pages to generate', validateInput });
    count = parseInt(count);

    var text = [];
    for (let k = 0; k < count; k++) {
        for (let j = 0; j < Math.floor(Math.random() * 3) + 5; j++) {
            for (let i = 0; i < Math.floor(Math.random() * 3) + 5; i++) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");
            text.push("\n");
        };
        text.push("\n");
    };

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join` `.split("\n").map(v => v.trim()).join("\n").trim()));
    console.log(new Date().toISOString(), `Generated ${count} pages`);
};

async function list() {
    var count = await vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: 'Number of list items to generate', validateInput });
    count = parseInt(count);

    var text = [];
    while (text.length < count) text.push(generate(Math.floor(Math.random() * 6) + 16).slice(8).join` ` + ".");

    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.insert(editor.selection.active, text.join`\n`));
    console.log(new Date().toISOString(), `Generated ${count} list items`);
};

const commands = [
    { generate: byte, name: "byte" },
    { generate: word, name: "word" },
    { generate: sentence, name: "sentence" },
    { generate: paragraph, name: "paragraph" },
    { generate: page, name: "page" },
    { generate: list, name: "list" }
];

/**
 * @description this method is called when your extension is activated
 * @param {vscode.ExtensionContext} context - The context for the extension
 */
function activate(context) {
    console.log(new Date().toISOString(), 'lorem_ipsum extention activating');

    commands.forEach(command => {
        console.log(new Date().toISOString(), `registering command ${command.name}`);
        context.subscriptions.push(vscode.commands.registerCommand('lorem_ipsum.' + command.name, command.generate));
    });

    console.log(new Date().toISOString(), 'lorem_ipsum extention activated');
};

/**
 * @description this method is called when your extension is deactivated
 */
function deactivate() {
    console.log(new Date().toISOString(), "lorem_ipsum extention deactivating");
    console.log(new Date().toISOString(), "lorem_ipsum extention deactivated");
};

module.exports = { activate, deactivate }; // https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file