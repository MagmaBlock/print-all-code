# 🖨️print-all-code

[English](./README.md) | [中文](./README-zh-CN.md)

## Introduction

`print-all-code` is a command-line tool designed to fully capture your source code into a single file. This file can then be used by AI models like ChatGPT for code writing assistance, enabling the AI to better understand, invoke, and modify your existing code.

## Features

- Recursively traverses specified source directories to collect all supported code files.
- Ignores files and directories specified in the `.gitignore` file.
- Formats the collected code for output in a specified Markdown file.

## Usage

Run the following command in your terminal to use `print-all-code`:
(If you use npm, you can use `npx` instead of `pnpx`)

```bash
pnpx print-all-code -s <source-directory-path> -o <output-file-path>
```

### Parameters

- `-s, --src <paths...>`: Source directory paths, can specify multiple paths, default is `./src`.
- `-o, --output <path>`: Output file path, default is `print-all-code.md`.

### Examples

1. By default, the program will scan the `./src` folder and output the results to `print-all-code.md`:

   ```bash
   pnpx print-all-code
   ```

2. Specify a different source folder and output file:

   ```bash
   pnpx print-all-code -s ./my-code -o ./output.md
   ```

3. Specify multiple source folders at once:

   ```bash
   pnpx print-all-code -s ./src -s ./lib -o ./all-code.md
   ```

## License

MIT
