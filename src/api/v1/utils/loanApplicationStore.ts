import {
  CreateLoanApplicationInput,
  LoanApplication,
  UpdateLoanApplicationInput
} from "../models/loanApplicationModel";

const loanApplications: LoanApplication[] = [
  {
    id: 1,
    applicant: "John Smith",
    amount: 50000,
    status: "pending",
    createdAt: "2025-01-10T10:00:00.000Z"
  },
  {
    id: 2,
    applicant: "Sarah Johnson",
    amount: 150000,
    status: "under_review",
    createdAt: "2025-01-08T10:00:00.000Z"
  },
  {
    id: 3,
    applicant: "Michael Chen",
    amount: 500000,
    status: "pending",
    createdAt: "2025-01-05T10:00:00.000Z"
  },
  {
    id: 4,
    applicant: "Emily Williams",
    amount: 1000000,
    status: "flagged",
    createdAt: "2025-01-03T10:00:00.000Z"
  }
];

let nextLoanApplicationId: number = 5;

export function getAllLoanApplications(): LoanApplication[] {
  return loanApplications;
}

export function getLoanApplicationById(
  loanApplicationId: number
): LoanApplication | undefined {
  return loanApplications.find(
    (loanApplication: LoanApplication) =>
      loanApplication.id === loanApplicationId
  );
}

export function createLoanApplication(
  createLoanApplicationInput: CreateLoanApplicationInput
): LoanApplication {
  const newLoanApplication: LoanApplication = {
    id: nextLoanApplicationId,
    applicant: createLoanApplicationInput.applicant,
    amount: createLoanApplicationInput.amount,
    status: createLoanApplicationInput.status,
    createdAt: new Date().toISOString()
  };

  loanApplications.push(newLoanApplication);
  nextLoanApplicationId += 1;

  return newLoanApplication;
}

export function updateLoanApplication(
  loanApplicationId: number,
  updateLoanApplicationInput: UpdateLoanApplicationInput
): LoanApplication | undefined {
  const existingLoanApplication: LoanApplication | undefined =
    getLoanApplicationById(loanApplicationId);

  if (!existingLoanApplication) {
    return undefined;
  }

  if (updateLoanApplicationInput.applicant !== undefined) {
    existingLoanApplication.applicant =
      updateLoanApplicationInput.applicant;
  }

  if (updateLoanApplicationInput.amount !== undefined) {
    existingLoanApplication.amount =
      updateLoanApplicationInput.amount;
  }

  if (updateLoanApplicationInput.status !== undefined) {
    existingLoanApplication.status =
      updateLoanApplicationInput.status;
  }

  return existingLoanApplication;
}

export function deleteLoanApplication(
  loanApplicationId: number
): boolean {
  const loanApplicationIndex: number = loanApplications.findIndex(
    (loanApplication: LoanApplication) =>
      loanApplication.id === loanApplicationId
  );

  if (loanApplicationIndex === -1) {
    return false;
  }

  loanApplications.splice(loanApplicationIndex, 1);
  return true;
}