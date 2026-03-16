import fs from "fs";
import path from "path";

const logsDirectoryPath: string = path.join(process.cwd(), "src", "logs");

export function ensureLogsDirectoryExists(): void {
  if (!fs.existsSync(logsDirectoryPath)) {
    fs.mkdirSync(logsDirectoryPath, { recursive: true });
  }
}

export function getAccessLogFilePath(): string {
  ensureLogsDirectoryExists();
  return path.join(logsDirectoryPath, "access.log");
}

export function getErrorLogFilePath(): string {
  ensureLogsDirectoryExists();
  return path.join(logsDirectoryPath, "error.log");
}