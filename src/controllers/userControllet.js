import { ObjectId } from "mongodb";
import db from "../db.js";

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