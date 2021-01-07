// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const request = require('request');
const translate = require('translation-google');


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
	let disposable = vscode.commands.registerCommand('vs.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		let input= await vscode.window.showInputBox();
		if (input) {
			vscode.window.showInformationMessage(input);
			

		} 


	});
	vscode.commands.registerCommand('vs.fetch_get', function () {
		// The code you place here will be executed every time your command is executed
		// https://api.datamuse.com/words?ml=exit
		const editor = vscode.window.activeTextEditor
		const text = editor.document.getText(editor.selection)
		

		request({
			headers: {}, // add here headers if you needed
			uri: text,
			method: 'GET',
			// bodyData will come here if method is POST
		}, (err, res, body) => {
			const data = JSON.parse(body);
			vscode.window.showInformationMessage("fetch....");
			//new unsave file
			const newFile = vscode.Uri.parse('untitled:' + vscode.workspace.workspaceFolders[0].uri.fsPath+ '/fetch_data.json');
			vscode.workspace.openTextDocument(newFile).then(document => {
				const edit = new vscode.WorkspaceEdit();
				
				edit.insert(newFile, new vscode.Position(0, 0), JSON.stringify(data,null,"\t"));
				return vscode.workspace.applyEdit(edit).then(success => {
					if (success) {
						vscode.window.showInformationMessage("success")
						
					} else {
						vscode.window.showWarningMessage("Error");
					}
				});
			});

			// here call other stuff wants to do.
		});
	});
	vscode.commands.registerCommand('vs.google_translate_ch', async function () {
		
		translate('This is Google Translate', {to: 'zh-cn'}).then(res => {
			// vscode.window.showWorkspaceFolderPick()
			// vscode.window.showOpenDialog({//選擇檔案
			// 	canSelectFiles: false,
			// 	canSelectFolders: true,
			// 	canSelectMany: false,
			// });
			// vscode.window.showTextDocument(res.text)
			// vscode.window.showQuickPick(["1","2","3"]) //選項
			vscode.window.showInformationMessage(res.text)

			//=> en
		}).catch(err => {
			vscode.window.showWarningMessage(err);
		});
		


	});

	vscode.commands.registerCommand('vs.google_translate_en', async function () {
		
		translate('This is Google Translate', {to: 'en'}).then(res => {
			// vscode.window.showWorkspaceFolderPick()
			// vscode.window.showOpenDialog({//選擇檔案
			// 	canSelectFiles: false,
			// 	canSelectFolders: true,
			// 	canSelectMany: false,
			// });
			// vscode.window.showTextDocument(res.text)
			// vscode.window.showQuickPick(["1","2","3"]) //選項
			vscode.window.showInformationMessage(res.text)

			//=> en
		}).catch(err => {
			vscode.window.showWarningMessage(err);
		});
		


	});



	context.subscriptions.push(disposable);
	// context.subscriptions.push();

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
		//new save file
		// const wsedit = new vscode.WorkspaceEdit();
		// const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		// const filePath = vscode.Uri.file(wsPath + '/hello/world.md');
		// vscode.window.showInformationMessage(filePath.toString());
		// wsedit.createFile(filePath, { ignoreIfExists: true });
		// vscode.workspace.applyEdit(wsedit);
		// vscode.window.showInformationMessage('Created a new file: hello/world.md');
		// vscode.window.showInformationMessage('helloWorld!');