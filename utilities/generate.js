const vscode = require("vscode");

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

module.exports = { generate, byte, word, sentence, paragraph, page, code };