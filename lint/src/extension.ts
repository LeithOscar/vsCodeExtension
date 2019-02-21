// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Rules } from './rules';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "checksintax lint" is now active!');

    let disposable = vscode.commands.registerCommand('extension.lint', () => {
        let textEditor = vscode.window.activeTextEditor;
        let rules = new Rules(textEditor)
        // The code you place here will be executed every time your command is executed
        // Display a message box to th user
        vscode.window.showInformationMessage('lint review stared...');

        let codeLines = textEditor.document.lineCount;
        for (let index = 1; index <= codeLines; index++) {
            rules.doubleQuotesRule(index);
            rules.importRule(index);
            //rules.commentRule(index);
            rules.privatePropertiesRule(index);
        }
        rules.showErrors();
    });
    context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() { }



