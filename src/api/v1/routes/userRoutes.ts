import { Router } from "express";
import { getUserDetailsController } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

export const userRoutes: Router = Router();

userRoutes.get("/users/:uid", authenticate, getUserDetailsController);