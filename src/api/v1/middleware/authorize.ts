import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { AuthorizationError } from "../errors/errors";

const authorize = (opts: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole: string | undefined = res.locals.role as string | undefined;
    const userUid: string | undefined = res.locals.uid as string | undefined;
    const requestUid: string | undefined = req.params.uid;

    if (!userRole) {
      next(
        new AuthorizationError(
          "Forbidden: Role not found in token",
          "ROLE_NOT_FOUND"
        )
      );
      return;
    }

    if (opts.hasRole.includes(userRole as "admin" | "manager" | "user")) {
      next();
      return;
    }

    if (opts.allowSameUser && userUid && requestUid && userUid === requestUid) {
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