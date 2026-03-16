import { Router } from "express";
import { setCustomClaimsController } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

export const adminRoutes: Router = Router();

adminRoutes.post(
  "/admin/setCustomClaims",
  authenticate,
  authorize({ hasRole: ["admin"] }),
  setCustomClaimsController
);