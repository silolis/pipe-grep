# pipe-grep

`pipe-grep` is a Visual Studio Code extension that provides grep-like filtering functionality. It allows you to filter lines in the active editor based on a regular expression (regex) pattern, similar to how you would use `| grep` on the command line.

## Features

- Filter lines in the active editor using a regex pattern in-line or in new editor
- Works with any file type supported by VSCode.

## Installation

1. Download and install the extension from the [VSCode Marketplace](https://marketplace.visualstudio.com/).
2. Alternatively, you can build and install the extension locally:
   - Clone the repository:
     ```bash
     git clone https://github.com/silolis/pipe-grep.git
     cd pipe-grep
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Build the extension:
     ```bash
     npm run compile
     ```
   - Package the extension:
     ```bash
     vsce package
     ```
   - Install the `.vsix` file in VSCode:
     - Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac).
     - Select `Extensions: Install from VSIX...`.
     - Choose the generated `.vsix` file.

## Usage

1. Open a file in VSCode.
2. Run the command `Grep: Filter Lines (In-Place)` from the Command Palette.
3. Enter a regex pattern when prompted.
   a. All lines except those matching the regex will be filtered.
   b. A new editor will open, displaying only the lines that match the pattern.
    



## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name