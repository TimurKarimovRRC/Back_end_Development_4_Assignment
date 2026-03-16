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
oanApplicationRoutes.get(
  "/loans",
  authenticate,
  authorize({ hasRole: ["admin", "manager", "user"] }),
  getAllLoanApplicationsController
);

loanApplicationRoutes.get(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager", "user"] }),
  getLoanApplicationByIdController
);

loanApplicationRoutes.post(
  "/loans",
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }),
  createLoanApplicationController
);

loanApplicationRoutes.put(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }),
  updateLoanApplicationController
);

loanApplicationRoutes.delete(
  "/loans/:id",
  authenticate,
  authorize({ hasRole: ["admin"] }),
  deleteLoanApplicationController
);