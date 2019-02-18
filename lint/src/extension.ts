// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
console.log('Congratulations, your extension "checksintax lint" is now active!');
    



    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.lint', () => {
        
        let textEditor= vscode.window.activeTextEditor;
        // The code you place here will be executed every time your command is executed
        // Display a message box to th user
        vscode.window.showInformationMessage('I try to check it >>>>>');
        let codeLines = textEditor.document.lineCount;

        for (let index = 1; index <= codeLines; index++) {
            
            doubleQuotesRule(textEditor, index);
            importRule(textEditor, index);
            commentRule(textEditor, index);
        }
        vscode.window.showInformationMessage('end CheckIt >>>>>');
        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export function doubleQuotesRule(textEditor: vscode.TextEditor, index: number):void
{
    let line = textEditor.document.lineAt(index -1).text;
    let dbC = line.match('"')
    
    if(dbC && dbC.length >=1 && dbC.length <= 1)
    {
        vscode.window.showErrorMessage('There are double quotes: ' + (index +1) );
    }    
}
export function importRule(textEditor: vscode.TextEditor, index: number):void
{
    let regexImport =  new RegExp("/[A-Z]");
    let line = textEditor.document.lineAt(index-1).text;
    let dbC = line.match(regexImport)
    
    if(dbC && dbC.length >=1 && dbC.length <= 1)
    {
        vscode.window.showErrorMessage("There are UpperWord on imports: " + (index +1) );
    }    
}
export function commentRule(textEditor: vscode.TextEditor, index: number):void
{
    let regexImport =  new RegExp('/\\*(?:.|[\\n\\r])*?\\*/');
    let line = textEditor.document.lineAt(index-1).text;
    let dbC = line.match(regexImport)
    
    if(dbC && dbC.length >=1 && dbC.length <= 1)
    {
        vscode.window.showErrorMessage('There are comments on your code: ' + (index +1) );
    }    
}