"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Rules {
    constructor(_textEditor) {
        this._textEditor = _textEditor;
        this._errors = [];
    }
    doubleQuotesRule(index) {
        let line = this._textEditor.document.lineAt(index - 1).text;
        let dbC = line.match('"');
        if (dbC && dbC.length >= 1 && dbC.length <= 1) {
            this.addErrorMessage('There are double quotes');
        }
    }
    importRule(index) {
        let mayusRule = new RegExp("/[A-Z]");
        let srcInternalRule = new RegExp("/src/internal/");
        let line = this._textEditor.document.lineAt(index - 1).text;
        let dbC1 = line.match(mayusRule);
        let dbC2 = line.match(srcInternalRule);
        if (dbC1 && dbC1.length >= 1 && dbC1.length <= 1) {
            this.addErrorMessage('There are UpperWord on imports');
        }
        if (dbC2 && dbC2.length >= 1 && dbC2.length <= 1) {
            this.addErrorMessage('There are src/internal in imports');
        }
    }
    commentRule(index) {
        let regexImport = new RegExp('/*[a-z]*/');
        let line = this._textEditor.document.lineAt(index - 1).text;
        let dbC = line.match(regexImport);
        if (dbC && dbC.length >= 1 && dbC.length <= 1) {
            this.addErrorMessage('There are comments on your code');
        }
    }
    privatePropertiesRule(index) {
        let rule1 = new RegExp('private [a-zA-Z]');
        let rule2 = new RegExp('private _[A-Z]');
        let rule3 = new RegExp('[()]');
        let line = this._textEditor.document.lineAt(index - 1).text;
        let underScoreRule = line.match(rule1);
        let mayusRule = line.match(rule2);
        let isMethodRule = line.match(rule3);
        if (!isMethodRule && (mayusRule || underScoreRule)) {
            if (underScoreRule && underScoreRule.length >= 1 && underScoreRule.length <= 1) {
                this.addErrorMessage('Property that does not start underscore');
            }
            if (mayusRule && mayusRule.length >= 1 && mayusRule.length <= 1) {
                this.addErrorMessage('Property names start with a capital');
            }
        }
    }
    addErrorMessage(error) {
        this._errors.push(error);
    }
    showErrors() {
        if (this._errors.length === 0) {
            vscode.window.showInformationMessage('succeed');
        }
        else {
            this._errors.forEach((err) => {
                vscode.window.showErrorMessage(err);
            });
        }
    }
}
exports.Rules = Rules;
//# sourceMappingURL=rules.js.map