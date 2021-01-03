// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vs.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('helloWorld!');
	});
	vscode.commands.registerCommand('vs.fetch_get', function () {
		// The code you place here will be executed every time your command is executed
		// https://api.datamuse.com/words?ml=exit
		const editor = vscode.window.activeTextEditor
		const text =editor.document.getText(editor.selection)
		vscode.window.showInformationMessage(text);
		
		request({
			headers: {}, // add here headers if you needed
			uri: text,
			method: 'GET', 
			// bodyData will come here if method is POST
			}, (err, res, body) => {
			const data = JSON.parse(body);
			vscode.window.showInformationMessage(body);

		// here call other stuff wants to do.
		});

		
		
	});

	context.subscriptions.push(disposable);
	// context.subscriptions.push();

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
