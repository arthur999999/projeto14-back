import db from "../db.js";
import joi from "joi";
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const regisSchamer = joi.object({

    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()

})

export async function singUp (req, res) {
    const regis = req.body

    const validation = regisSchamer.validate(regis, {abortEarly: false})

    if (validation.error){
        res.status(422).send(validation.error.message)
        return
    }

    if (regis.password != regis.confirmPassword){
        res.status(422).send('Confirme sua senha!')
        return
    }

    try {
        const otherUser = await db.collection('Users').findOne({name: regis.name})
        const otherUser2 = await db.collection('Users').findOne({email: regis.email})
        if(otherUser ){
            res.send('Nome de usuário já existente').status(409)
            return
        }
        if(otherUser2 ){
            res.send('Email já cadastrado').status(409)
            return
        }
    } catch (error) {
        res.send(error).status(422)
        return
    }

   

    const passwordEncrypt = bcrypt.hashSync(regis.password, 10)

    try {
        await db.collection('Users').insertOne({name: regis.name, email: regis.email, password: passwordEncrypt})
        res.sendStatus(201)
    } catch (error) {
        res.send(error).status(422)
    }
}

const loginSchamer = joi.object({

    email: joi.string().required(),
    password: joi.string().required()

})

export async function singIn (req, res) {
    const user = req.body

    const validation = loginSchamer.validate(user, {abortEarly: false})

    if (validation.error){
        res.status(422).send(validation.error.message)
        return
    }

    try {
        const userFind = await db.collection('Users').findOne({email: user.email})

        if(!userFind){
            res.status(404).send('Email não cadastrado')
            return
        }

        if(bcrypt.compareSync(user.password, userFind.password)){
            const token = uuid()

            await db.collection("sessions").insertOne({
                userId: userFind._id,
                token
            })
            res.send(token)
            return
        }else{
            res.status(406).send("Senha incorreta").
            return
        }

    } catch (error) {
        res.status(422).send(error)
    }

}