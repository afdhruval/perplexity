import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidate } from "../validator/reg.validate.js";
import { verifyEmail } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/register", register)

authRouter.get("/verify",verifyEmail) 

export default authRouter