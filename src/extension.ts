import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('quickDim.dim', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            return;
        }

        const opacity = vscode.workspace.getConfiguration('quickDim').get('opacity');
        const dimDecorationType = vscode.window.createTextEditorDecorationType({
            opacity: `${opacity}`
        });

        const ranges: vscode.Range[] = [];
        for (let i = 0; i < editor.selections.length; i++) {
            const selection = editor.selections[i];

            const startLine = selection.start.line;
            const startPosition = editor.document.lineAt(startLine).range.start;

            const endLine = selection.end.line;
            const endPosition = editor.document.lineAt(endLine).range.end;

            ranges.push(new vscode.Range(startPosition, endPosition));
        }

        editor.setDecorations(dimDecorationType, ranges);
    }));
}