import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { BadRequestError, NotFoundError } from "../errors/errors";
import {
  CreateLoanApplicationInput,
  LoanApplication,
  UpdateLoanApplicationInput
} from "../models/loanApplicationModel";
import {
  createLoanApplication,
  deleteLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplication
} from "../utils/loanApplicationStore";

export function getHealthController(
  _request: Request,
  response: Response
): void {
  response.status(HTTP_STATUS.OK).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString()
  });
}

export function getAllLoanApplicationsController(
  _request: Request,
  response: Response
): void {
  const loanApplications: LoanApplication[] = getAllLoanApplications();

  response.status(HTTP_STATUS.OK).json({
    success: true,
    count: loanApplications.length,
    data: loanApplications
  });
}

export function getLoanApplicationByIdController(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const loanApplicationId: number = Number(request.params.id);

    if (Number.isNaN(loanApplicationId)) {
      throw new BadRequestError(
        "Loan application id must be a number",
        "INVALID_LOAN_ID"
      );
    }

    const loanApplication: LoanApplication | undefined =
      getLoanApplicationById(loanApplicationId);

    if (!loanApplication) {
      throw new NotFoundError(
        "Loan application not found",
        "LOAN_NOT_FOUND"
      );
    }

    response.status(HTTP_STATUS.OK).json({
      success: true,
      data: loanApplication
    });
  } catch (error: unknown) {
    next(error);
  }
}

export function createLoanApplicationController(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const createLoanApplicationInput: CreateLoanApplicationInput =
      request.body as CreateLoanApplicationInput;

    if (
      !createLoanApplicationInput.applicant ||
      typeof createLoanApplicationInput.amount !== "number" ||
      !createLoanApplicationInput.status
    ) {
      throw new BadRequestError(
        "Missing or invalid loan application fields",
        "INVALID_LOAN_INPUT"
      );
    }

    const createdLoanApplication: LoanApplication =
      createLoanApplication(createLoanApplicationInput);

    response.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: createdLoanApplication
    });
  } catch (error: unknown) {
    next(error);
  }
}

export function updateLoanApplicationController(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const loanApplicationId: number = Number(request.params.id);

    if (Number.isNaN(loanApplicationId)) {
      throw new BadRequestError(
        "Loan application id must be a number",
        "INVALID_LOAN_ID"
      );
    }

    const updateLoanApplicationInput: UpdateLoanApplicationInput =
      request.body as UpdateLoanApplicationInput;

    const updatedLoanApplication: LoanApplication | undefined =
      updateLoanApplication(
        loanApplicationId,
        updateLoanApplicationInput
      );

    if (!updatedLoanApplication) {
      throw new NotFoundError(
        "Loan application not found",
        "LOAN_NOT_FOUND"
      );
    }

    response.status(HTTP_STATUS.OK).json({
      success: true,
      data: updatedLoanApplication
    });
  } catch (error: unknown) {
    next(error);
  }
}

export function deleteLoanApplicationController(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const loanApplicationId: number = Number(request.params.id);

    if (Number.isNaN(loanApplicationId)) {
      throw new BadRequestError(
        "Loan application id must be a number",
        "INVALID_LOAN_ID"
      );
    }

    const wasDeleted: boolean = deleteLoanApplication(loanApplicationId);

    if (!wasDeleted) {
      throw new NotFoundError(
        "Loan application not found",
        "LOAN_NOT_FOUND"
      );
    }

    response.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Loan application deleted"
    });
  } catch (error: unknown) {
    next(error);
  }
}