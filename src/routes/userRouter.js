import { Router } from "express";
import { getReg, postReg } from "../controllers/userControllet.js";
import { tokenValidation } from "../middleware/tokenValidation.js";

const userRouter = Router()
userRouter.get('/regis',tokenValidation , getReg)
userRouter.post('/registro', tokenValidation, postReg )


export default userRouter