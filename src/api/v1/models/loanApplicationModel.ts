export interface LoanApplication {
  id: number;
  applicant: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface CreateLoanApplicationInput {
  applicant: string;
  amount: number;
  status: string;
}

export interface UpdateLoanApplicationInput {
  applicant?: string;
  amount?: number;
  status?: string;
}