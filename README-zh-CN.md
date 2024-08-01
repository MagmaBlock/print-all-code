# 🖨️print-all-code

[English](./README.md) | [中文](./README-zh-CN.md)

## 简介

`print-all-code` 是一个命令行工具，旨在将你的源代码完全复制到一个文件中。这个文件可以被 ChatGPT 等 AI 大模型用于代码编写辅助，从而使 AI 能够更好地理解、调用和修改你现有的代码。

## 功能

- 递归遍历指定的源文件夹，收集所有支持的代码文件。
- 忽略 `.gitignore` 文件中指定的文件和文件夹。
- 将收集到的代码按文件路径和语言格式化输出到指定的 Markdown 文件中。

## 使用方法

在终端中运行以下命令来使用 `print-all-code`：
（如果你使用 npm，请你将 `pnpx` 替换为 `npx`）

```bash
pnpx print-all-code -s <源文件夹路径> -o <输出文件路径>
```

### 参数说明

- `-s, --src <paths...>`: 源文件夹路径，可以指定多个路径，默认值为 `./src`。
- `-o, --output <path>`: 输出文件路径，默认为 `print-all-code.md`。

### 示例

1. 默认情况下，程序将扫描 `./src` 文件夹并将结果输出到 `print-all-code.md`：

   ```bash
   pnpx print-all-code
   ```

2. 指定不同的源文件夹和输出文件：

   ```bash
   pnpx print-all-code -s ./my-code -o ./output.md
   ```

3. 同时指定多个源文件夹：

   ```bash
   pnpx print-all-code -s ./src -s ./lib -o ./all-code.md
   ```

## License

MIT
