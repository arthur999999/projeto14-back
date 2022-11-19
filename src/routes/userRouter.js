import { Router } from "express";
import { getReg } from "../controllers/userControllet.js";
import { tokenValidation } from "../middleware/tokenValidation.js";

const userRouter = Router()
userRouter.use('/regis',tokenValidation , getReg)

export default userRouter