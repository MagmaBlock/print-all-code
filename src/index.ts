import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";
import ignore from "ignore";

const program = new Command();

program
  .option("-s, --src <paths...>", "源文件夹路径", ["./src"])
  .option("-o, --output <path>", "输出文件路径", "print-all-code.md")
  .parse(process.argv);

const options = program.opts();

const sourceDirs: string[] = options.src;
const outputFile: string = options.output;

// 定义可以作为代码文件的扩展名
const codeExtensions = new Set([
  ".ts",
  ".js",
  ".tsx",
  ".jsx",
  ".java",
  ".py",
  ".rb",
  ".php",
  ".c",
  ".cpp",
  ".h",
  ".hpp",
  ".cs",
  ".go",
  ".swift",
  ".kt",
  ".rs",
]);

function isCodeFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return codeExtensions.has(ext);
}

function getLanguage(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".ts":
    case ".tsx":
      return "typescript";
    case ".js":
    case ".jsx":
      return "javascript";
    case ".java":
      return "java";
    case ".py":
      return "python";
    case ".rb":
      return "ruby";
    case ".php":
      return "php";
    case ".c":
    case ".h":
      return "c";
    case ".cpp":
    case ".hpp":
      return "cpp";
    case ".cs":
      return "csharp";
    case ".go":
      return "go";
    case ".swift":
      return "swift";
    case ".kt":
      return "kotlin";
    case ".rs":
      return "rust";
    default:
      return "plaintext";
  }
}

function getIgnoreFilter(dir: string): (path: string) => boolean {
  const currentGitignorePath = path.join(dir, ".gitignore");
  const parentGitignorePath = path.join(dir, "..", ".gitignore");

  let ig = ignore();

  // 检查上一层目录的 .gitignore
  if (fs.existsSync(parentGitignorePath)) {
    const parentGitignoreContent = fs.readFileSync(
      parentGitignorePath,
      "utf-8"
    );
    ig.add(parentGitignoreContent);
  }

  // 检查当前目录的 .gitignore（如果存在，会覆盖上一层的规则）
  if (fs.existsSync(currentGitignorePath)) {
    const currentGitignoreContent = fs.readFileSync(
      currentGitignorePath,
      "utf-8"
    );
    ig.add(currentGitignoreContent);
  }

  // 如果没有找到任何 .gitignore 文件，返回一个总是返回 true 的函数
  if (
    !fs.existsSync(currentGitignorePath) &&
    !fs.existsSync(parentGitignorePath)
  ) {
    return () => true;
  }

  // 返回一个函数，该函数检查给定的文件路径是否应该被忽略
  return (filePath: string) => !ig.ignores(path.relative(dir, filePath));
}

function processDirectory(
  dir: string,
  output: string[] = [],
  ignoreFilter: (path: string) => boolean
): string[] {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (ignoreFilter(filePath)) {
      if (stats.isDirectory()) {
        processDirectory(filePath, output, ignoreFilter);
      } else if (isCodeFile(filePath)) {
        const relativePath = path.relative(process.cwd(), filePath);
        const content = fs.readFileSync(filePath, "utf-8");
        const language = getLanguage(filePath);

        output.push(`// ${relativePath}`);
        output.push("```" + language);
        output.push(content);
        output.push("```");
        output.push("");
      }
    }
  }

  return output;
}

function main() {
  let output: string[] = [];

  for (const sourceDir of sourceDirs) {
    const ignoreFilter = getIgnoreFilter(sourceDir);
    output = processDirectory(sourceDir, output, ignoreFilter);
  }

  fs.writeFileSync(outputFile, output.join("\n"));
  console.log(`处理完成，输出文件：${outputFile}`);
}

main();
