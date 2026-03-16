import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { AuthorizationError } from "../errors/errors";

const authorize = (options: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole: string | undefined = res.locals.role as string | undefined;
    const userUid: string | undefined = res.locals.uid as string | undefined;

    const requestUidParam: string | string[] | undefined = req.params.uid;
    const requestUid: string | undefined = Array.isArray(requestUidParam)
      ? requestUidParam[0]
      : requestUidParam;

    if (!userRole) {
      next(
        new AuthorizationError(
          "Forbidden: Role not found in token",
          "ROLE_NOT_FOUND"
        )
      );
      return;
    }

    if (options.hasRole.includes(userRole as "user" | "manager" | "admin")) {
      next();
      return;
    }

    if (
      options.allowSameUser &&
      userUid &&
      requestUid &&
      userUid === requestUid
    ) {
      next();
      return;
    }

    next(
      new AuthorizationError(
        "Forbidden: Insufficient role",
        "INSUFFICIENT_ROLE"
      )
    );
  };
};

export default authorize;