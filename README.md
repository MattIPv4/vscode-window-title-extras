# VSCode Window Title Extras

VSCode extension that provides additional window title variables.

The following variables are exposed by this extension for use in `window.title`:

- `${parentPath}`: file path of the parent folder to the current workspace folder (e.g. /Users/Development).
- `${parentName}`: name of the parent folder to the current workspace folder (e.g. Development).

## Development

### 0. Prerequisites

- [Node](https://nodejs.org/en/download/releases/) (see [`.nvmrc`](.nvmrc); [`fnm`](https://github.com/Schniz/fnm)/[`nvm`](https://github.com/nvm-sh/nvm) recommended)
- [VSCode](https://code.visualstudio.com/download)

### 1. Download the project

```bash
git clone git@github.com:MattIPv4/vscode-window-title-extras.git
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Build the project

```bash
# Build once
npm run build

# Build and watch for changes
npm run watch
```

### 4. Run the extension

Use `F5` or `Debug: Start Debugging` in the command palette to run the extension in a new VSCode window. In the new window, open the workspace (or user) settings and set the `window.title` to test the functionality of the extension. For example:

```json
{
  "window.title": "${parentName}/${folderName}"
}
```

In the host window, you can open the `Run Extension` debug console (`Debug: Select Debug Console` in the command palette) to see the output of the extension.

### 5. Package the extension

You can also test the extension against your local VSCode installation. To do this, the extension must be packaged with the `vsce` tool:

```bash
npx vsce package
```

This will create a `.vsix` file in the root of the project. You can then install this file in your local VSCode installation by running the following command:

```bash
code --install-extension <path-to-vsix-file>
```

Once installed, restart VSCode (or invoke `Developer: Reload Window` in the command palette) to start using the extension.

## Release

### 0. Update the version

```bash
npm version <major|minor|patch>
```

### 1. Create Azure DevOps token

- Access the [Azure DevOps](https://dev.azure.com/) portal.
- Go to `User settings` > `Personal access tokens`.
- Create a new token with the `Marketplace: Manage` scope.

### 2. Build + publish the extension

```bash
npx vsce publish
```
