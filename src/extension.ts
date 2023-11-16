// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "auto-quotation" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "auto-quotation.contextmenu.auto-quotation",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage("Hello World from auto-quotation!");
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = editor.document;
      const selection = editor.selection;
      let text = document.getText(selection);
      const quotaitioned = text
        .split(",")
        .map((s) => `"${s}"`)
        .join(", ");
      editor.edit((edit) => {
        edit.replace(selection, quotaitioned);
      });
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "auto-quotation.contextmenu.auto-quotationWithSpace",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = editor.document;
      const selection = editor.selection;
      let text = document.getText(selection);
      const quotaitioned = text
        .split(" ")
        .map((s) => `"${s}"`)
        .join(", ");
      editor.edit((edit) => {
        edit.replace(selection, quotaitioned);
      });
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "auto-quotation.contextmenu.auto-dis-quotation",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      const document = editor.document;
      const selection = editor.selection;
      let text = document.getText(selection);
      const quotaitioned = text
        .split(",")
        .map((elm) =>
          elm
            .split("")
            .filter((s) => ![`"`, `'`].includes(s))
            .join("")
        )
        .join(",");
      editor.edit((edit) => {
        edit.replace(selection, quotaitioned);
      });
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

// This method is called when your extension is deactivated
export function deactivate() {}
