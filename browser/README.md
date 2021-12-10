# Browser
### The browser extension runs from one file and can only include `const vscode = require('vscode');` and `module.exports = { activate, deactivate };` from node (more info [here](https://code.visualstudio.com/api/extension-guides/web-extensions#web-extension-main-file)).
#### Templates for adding commands (`./browser.js`)
```js
function execute() {
    // CODE
};
```
```js
async function execute() {
    // CODE
};
```
### Commands must be added to the commands array to be included.
```js
const commands = [
    // COMMANDS
    { generate: FUNCTION, name: "COMMAND_NAME" }
];
```