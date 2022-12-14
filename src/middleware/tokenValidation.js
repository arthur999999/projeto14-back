import db from "../db.js"

export async function tokenValidation (req, res, next) {

    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token){
        return res.sendStatus(401)
    }

    try {
        const session = await db.collection('sessions').findOne({token})
        if(!session){
            return res.sendStatus(401)
        }
    
        req.userId= session.userId

    } catch (error) {
        res.status(422).send(error.message)
        return
    }
    

    

    next()

}