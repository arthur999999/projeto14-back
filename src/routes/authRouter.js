import { Router } from "express";
import { singIn, singUp } from "../controllers/authController.js";

const authRouter = Router()
authRouter.post('/register', singUp)
authRouter.post('/login', singIn)

export default authRouter