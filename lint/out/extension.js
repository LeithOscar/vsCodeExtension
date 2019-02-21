"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "checksintax lint" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.lint', () => {
        let textEditor = vscode.window.activeTextEditor;
        // The code you place here will be executed every time your command is executed
        // Display a message box to th user
        vscode.window.showInformationMessage('lint review stared...');
        vscode.DiagnosticRelatedInformation;
        let codeLines = textEditor.document.lineCount;
        for (let index = 1; index <= codeLines; index++) {
            doubleQuotesRule(textEditor, index);
            importRule(textEditor, index);
            commentRule(textEditor, index);
            privatePropertiesRule(textEditor, index);
        }
        vscode.window.showInformationMessage('end review');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function doubleQuotesRule(textEditor, index) {
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC = line.match('"');
    if (dbC && dbC.length >= 1 && dbC.length <= 1) {
        vscode.window.showErrorMessage('There are double quotes');
    }
}
exports.doubleQuotesRule = doubleQuotesRule;
function importRule(textEditor, index) {
    let regexImport = new RegExp("/[A-Z]");
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC = line.match(regexImport);
    if (dbC && dbC.length >= 1 && dbC.length <= 1) {
        vscode.window.showErrorMessage('There are UpperWord on imports');
    }
}
exports.importRule = importRule;
function commentRule(textEditor, index) {
    let regexImport = new RegExp('/*[a-z]*/');
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC = line.match(regexImport);
    if (dbC && dbC.length >= 1 && dbC.length <= 1) {
        vscode.window.showErrorMessage('There are comments on your code');
    }
}
exports.commentRule = commentRule;
function privatePropertiesRule(textEditor, index) {
    let rule1 = new RegExp('private *[a-z]');
    let rule2 = new RegExp('private *[A-Z]');
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC1 = line.match(rule1);
    let dbC2 = line.match(rule2);
    if (dbC1 && dbC1.length >= 1 && dbC1.length <= 1) {
        vscode.window.showErrorMessage('Property that does not start underscore');
    }
    if (dbC2 && dbC2.length >= 1 && dbC2.length <= 1) {
        vscode.window.showErrorMessage('Property names start with a capital');
    }
}
exports.privatePropertiesRule = privatePropertiesRule;
//# sourceMappingURL=extension.js.map