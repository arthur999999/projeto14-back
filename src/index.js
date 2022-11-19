import express from 'express';

import cors from "cors";
import dotenv from 'dotenv';
import joi from 'joi';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use(userRouter)

app.listen(5000, ()=> {console.log('rodando na 5000')})




