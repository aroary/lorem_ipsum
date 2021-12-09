# Commands

#### Templates for adding commands (`./NAME.js`):
```js
const vscode = require('vscode');

function execute() {
    // CODE
};

module.exports = { name: "NAME", execute };
```
```js
const vscode = require('vscode');

async function execute() {
    // CODE
};

module.exports = { name: "NAME", execute };
```