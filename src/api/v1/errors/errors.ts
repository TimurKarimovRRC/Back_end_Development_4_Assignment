import { HTTP_STATUS } from "../../../constants/httpConstants";

export class AppError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, code: string) {
    super(message, code, HTTP_STATUS.UNAUTHORIZED);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, code: string) {
    super(message, code, HTTP_STATUS.FORBIDDEN);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code: string = "BAD_REQUEST") {
    super(message, code, HTTP_STATUS.BAD_REQUEST);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, code: string = "NOT_FOUND") {
    super(message, code, HTTP_STATUS.NOT_FOUND);
  }
}