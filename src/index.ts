import * as vscode from "vscode";

const prefix = "vscode-window-title-extras:";

const keys = {
  parentPath: () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) return;

    const path = folder.uri.path;
    return path.split("/").slice(0, -1).join("/");
  },
  parentName: () => {
    const folder = vscode.workspace.workspaceFolders?.[0];
    if (!folder) return;

    const path = folder.uri.path;
    return path.split("/").slice(0, -1).pop();
  },
} as const satisfies Record<string, () => string | undefined>;

const reset = () =>
  Promise.all(
    Object.keys(keys).map((key) =>
      vscode.commands.executeCommand(
        "setContext",
        `${prefix}${key}`,
        undefined,
      ),
    ),
  );

const refresh = () =>
  Promise.all(
    Object.entries(keys).map(([key, get]) => {
      const value = get();
      console.log(`${prefix} ${key}: ${value}`);
      return vscode.commands.executeCommand(
        "setContext",
        `${prefix}${key}`,
        value,
      );
    }),
  );

export const activate = async (context: vscode.ExtensionContext) => {
  console.log(`${prefix} activated`);
  await refresh();

  // Support added in https://github.com/microsoft/vscode/pull/225408
  // Earliest version for https://github.com/microsoft/vscode/commit/b23a5000f08f3de1e0aa493c88c376e4196f49c1 is 1.93.0
  await Promise.all(
    Object.keys(keys).map((key) =>
      vscode.commands.executeCommand(
        "registerWindowTitleVariable",
        key,
        `${prefix}${key}`,
      ),
    ),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(refresh),
  );
};

export const deactivate = async () => {
  console.log(`${prefix} deactivated`);
  await reset();
};
