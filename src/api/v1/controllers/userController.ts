import { NextFunction, Request, Response } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { BadRequestError, NotFoundError } from "../errors/errors";

export async function getUserDetailsController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userIdParam: string | string[] | undefined = request.params.uid;
    const userId: string | undefined = Array.isArray(userIdParam)
      ? userIdParam[0]
      : userIdParam;

    if (!userId) {
      throw new BadRequestError("User id is required", "USER_ID_REQUIRED");
    }

    const userRecord = await auth.getUser(userId);

    response.status(HTTP_STATUS.OK).json({
      success: true,
      data: {
        uid: userRecord.uid,
        email: userRecord.email,
        disabled: userRecord.disabled,
        customClaims: userRecord.customClaims ?? {},
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("There is no user")) {
      next(new NotFoundError("User not found", "USER_NOT_FOUND"));
      return;
    }

    next(error);
  }
}