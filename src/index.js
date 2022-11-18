import express from 'express';

import cors from "cors";
import dotenv from 'dotenv';
import joi from 'joi';
import { singUp } from './controllers/authController.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/register', singUp)

app.listen(5000, ()=> {console.log('rodando na 5000')})




