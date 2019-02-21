// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let errors : Array<string>=[];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "checksintax lint" is now active!');

    let disposable = vscode.commands.registerCommand('extension.lint', () => {
        let textEditor = vscode.window.activeTextEditor;
        // The code you place here will be executed every time your command is executed
        // Display a message box to th user
        vscode.window.showInformationMessage('lint review stared...');
        vscode.DiagnosticRelatedInformation

        let codeLines = textEditor.document.lineCount;

        for (let index = 1; index <= codeLines; index++) {

            doubleQuotesRule(textEditor, index);
            importRule(textEditor, index);
            //commentRule(textEditor, index);
            privatePropertiesRule(textEditor, index);
        }

        showErrors();
    });
    context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() { }

export function doubleQuotesRule(textEditor: vscode.TextEditor, index: number): void {
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC = line.match('"')

    if (dbC && dbC.length >= 1 && dbC.length <= 1) {
        
        addErrorMessage('There are double quotes');
    }
}
export function importRule(textEditor: vscode.TextEditor, index: number): void {
    let mayusRule = new RegExp("/[A-Z]");
    let srcInternalRule = new RegExp("/src/internal/");
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC1 = line.match(mayusRule)
    let dbC2 = line.match(srcInternalRule)

    if (dbC1 && dbC1.length >= 1 && dbC1.length <= 1) {
        addErrorMessage('There are UpperWord on imports');
    }
    
    if (dbC2 && dbC2.length >= 1 && dbC2.length <= 1) {
        addErrorMessage('There are src/internal in imports');
    }
}
export function commentRule(textEditor: vscode.TextEditor, index: number): void {
    let regexImport = new RegExp('/*[a-z]*/');
    let line = textEditor.document.lineAt(index - 1).text;
    let dbC = line.match(regexImport)

    if (dbC && dbC.length >= 1 && dbC.length <= 1) {
        addErrorMessage('There are comments on your code');
    }
}
export function privatePropertiesRule(textEditor: vscode.TextEditor, index: number): void {
    let rule1 = new RegExp('private [a-zA-Z]');
    let rule2 = new RegExp('private _[A-Z]');
    let rule3 = new RegExp('[()]');
    let line = textEditor.document.lineAt(index - 1).text;
    let underScoreRule = line.match(rule1);
    let mayusRule = line.match(rule2)
    let isMethodRule = line.match(rule3)

    if (!isMethodRule && ( mayusRule || underScoreRule)) {
        if (underScoreRule && underScoreRule.length >= 1 && underScoreRule.length <= 1) {

            addErrorMessage('Property that does not start underscore');
        }
        if (mayusRule && mayusRule.length >= 1 && mayusRule.length <= 1) {
           addErrorMessage('Property names start with a capital');
        }
    }
}

export function addErrorMessage(error:string){
    errors.push(error);
}

export function showErrors()
{
    if(errors.length ===0)
    {
        vscode.window.showInformationMessage('succeed');
    }
    else{
        errors.forEach((err)=>{
            vscode.window.showErrorMessage(err);
        });
    }
}