import * as vscode from "vscode";

const key = (key: string) => `vscode-window-title-extras:${key}`;

const reset = async () => {
  await vscode.commands.executeCommand(
    "setContext",
    key("parentPath"),
    undefined,
  );
  await vscode.commands.executeCommand(
    "setContext",
    key("parentName"),
    undefined,
  );
};

const refresh = async () => {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    await reset();
    console.log("vscode-window-title-extras: no workspace folder");
    return;
  }

  const workspacePath = workspaceFolder.uri.path;

  const workspaceParentPath = workspacePath.substring(
    0,
    workspacePath.lastIndexOf("/"),
  );
  await vscode.commands.executeCommand(
    "setContext",
    key("parentPath"),
    workspaceParentPath,
  );
  console.log("vscode-window-title-extras: parentPath", workspaceParentPath);

  const workspaceParentName = workspaceParentPath.substring(
    workspaceParentPath.lastIndexOf("/") + 1,
  );
  await vscode.commands.executeCommand(
    "setContext",
    key("parentName"),
    workspaceParentName,
  );
  console.log("vscode-window-title-extras: parentName", workspaceParentName);
};

export const activate = async (context: vscode.ExtensionContext) => {
  console.log("vscode-window-title-extras: activated");
  await refresh();

  // Support added in https://github.com/microsoft/vscode/pull/225408
  // Earliest version for https://github.com/microsoft/vscode/commit/b23a5000f08f3de1e0aa493c88c376e4196f49c1 is 1.93.0
  await vscode.commands.executeCommand(
    "registerWindowTitleVariable",
    "parentPath",
    key("parentPath"),
  );
  await vscode.commands.executeCommand(
    "registerWindowTitleVariable",
    "parentName",
    key("parentName"),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeWorkspaceFolders(refresh),
  );
};

export const deactivate = async () => {
  console.log("vscode-window-title-extras: deactivated");
  await reset();
};
