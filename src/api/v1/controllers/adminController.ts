import { NextFunction, Request, Response } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { BadRequestError } from "../errors/errors";

export async function setCustomClaimsController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const email: string | undefined = request.body?.email;
    const role: string | undefined = request.body?.role;

    if (!email || !role) {
      throw new BadRequestError(
        "Email and role are required",
        "INVALID_CUSTOM_CLAIMS_INPUT"
      );
    }

    const userRecord = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(userRecord.uid, { role });

    response.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Custom claims updated",
      data: { uid: userRecord.uid, email, role },
    });
  } catch (error: unknown) {
    next(error);
  }
}