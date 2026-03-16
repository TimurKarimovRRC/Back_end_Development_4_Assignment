import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.code
      },
      timestamp: new Date().toISOString()
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR"
    },
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;