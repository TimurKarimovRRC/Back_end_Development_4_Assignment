import { Router } from "express";
import { getHealthController } from "../controllers/loanApplicationController";

export const healthRoutes: Router = Router();

healthRoutes.get("/health", getHealthController);