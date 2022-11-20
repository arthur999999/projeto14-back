import { ObjectId } from "mongodb";
import db from "../db.js";
import joi from "joi";
import dayjs from "dayjs"

export async function getReg (req, res) {
    const id = req.userId
    
    try {
        const user = await db.collection('Users').findOne( ObjectId(id))

        if(!user) {
            res.status(404).send('Usuário não encontrado')
            return
        }

        delete user.password

        const listRegis = await db.collection('registros').find({email: user.email}).toArray()

       

        const data = {
            name: user.name,
            data: listRegis
        }

        res.send(data)
    } catch (error) {
        res.status(422).send(error.message)
    }
}

const postSchamer = joi.object({
    value: joi.number().required(),
    desc: joi.required(),
    type: joi.any().valid('positive', 'negative').required()
})

//não permitir enviar numero invalido

export async function postReg (req, res) {
    const id = req.userId
    const data = req.body
    
    const validation = postSchamer.validate(data, {abortEarly: false})


    if (validation.error){
        res.status(401).send(validation.error.message)
        return
    }


    try {

        const user = await db.collection('Users').findOne( ObjectId(id))

        if(!user) {
            res.status(404).send('Usuário não encontrado')
            return
        }

        const newReg = {
            email: user.email,
            value: data.value,
            desc: data.desc,
            type: data.type,
            date: `${dayjs().date()}/${dayjs().month() + 1}`
        }

        await db.collection('registros').insertOne(newReg)

        res.sendStatus(201)
   
    } catch (error) {
        res.status(422).send(error.message)
    }
}