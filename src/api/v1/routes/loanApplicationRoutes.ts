import { Router } from "express";
import {
  createLoanApplicationController,
  deleteLoanApplicationController,
  getAllLoanApplicationsController,
  getLoanApplicationByIdController,
  updateLoanApplicationController
} from "../controllers/loanApplicationController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

export const loanApplicationRoutes: Router = Router();

loanApplicationRoutes.get(
  "/loans",
  authenticate,
  authorize({ hasRole: ["user", "manager", "admin"] }),
  getAllLoanApplicationsController
);

loanApplicationRoutes.get(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["user", "manager", "admin"] }),
  getLoanApplicationByIdController
);

loanApplicationRoutes.post(
  "/loans",
  authenticate,
  authorize({ hasRole: ["manager", "admin"] }),
  createLoanApplicationController
);

loanApplicationRoutes.put(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["manager", "admin"] }),
  updateLoanApplicationController
);

loanApplicationRoutes.delete(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["admin"] }),
  deleteLoanApplicationController
);