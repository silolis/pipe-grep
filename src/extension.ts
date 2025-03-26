import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the in-place grep command
    let grepInPlace = vscode.commands.registerCommand('pipe-grep.grepInPlace', async () => {
        await filterLines(true);
    });

    // Register the new document grep command
    let grepNewDoc = vscode.commands.registerCommand('pipe-grep.grepNewDoc', async () => {
        await filterLines(false);
    });

    context.subscriptions.push(grepInPlace, grepNewDoc);
}

async function filterLines(inPlace: boolean) {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    // Prompt for the regex pattern
    const pattern = await vscode.window.showInputBox({
        prompt: 'Enter grep pattern (regex supported)',
        placeHolder: 'Search pattern'
    });

    if (!pattern) {
        return; // User canceled the input
    }

    try {
        const regex = new RegExp(pattern);
        const document = editor.document;
        const text = document.getText();
        const lines = text.split('\n');

        // Filter lines that match the regex
        const matchedLines = lines.filter(line => regex.test(line));

        if (inPlace) {
            // Replace the content of the editor with the filtered lines
            await editor.edit(editBuilder => {
                const fullRange = new vscode.Range(
                    document.positionAt(0), // Start of the document
                    document.positionAt(text.length) // End of the document
                );
                editBuilder.replace(fullRange, matchedLines.join('\n'));
            });
        } else {
            // Create a new document with the filtered lines
            const newDoc = await vscode.workspace.openTextDocument({
                content: matchedLines.join('\n'),
                language: document.languageId
            });
            await vscode.window.showTextDocument(newDoc);
        }

        vscode.window.showInformationMessage(`Filtered ${lines.length - matchedLines.length} lines out of ${lines.length}.`);

    } catch (error) {
        vscode.window.showErrorMessage('Invalid regular expression');
    }
}

export function deactivate() {}