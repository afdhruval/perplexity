import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
// import { registerValidate } from "../validator/reg.validate.js";

const authRouter = Router()

authRouter.post("/register", register)

export default authRouter