import express from "express";
import fs from "fs";
import morgan from "morgan";
import { healthRoutes } from "./api/v1/routes/healthRoutes";
import { loanApplicationRoutes } from "./api/v1/routes/loanApplicationRoutes";
import { userRoutes } from "./api/v1/routes/userRoutes";
import { adminRoutes } from "./api/v1/routes/adminRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
import { getAccessLogFilePath } from "./logs/loggingUtils";

export const app = express();

const accessLogStream = fs.createWriteStream(getAccessLogFilePath(), {
  flags: "a"
});

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

app.use("/api/v1", healthRoutes);
app.use("/api/v1", loanApplicationRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);

app.use(errorHandler);