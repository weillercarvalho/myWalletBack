import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import db from "../db.js";

const singUpSchema = joi.object({
    name: joi.string().empty(" ").min(1).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).empty(" ").min(1).max(30).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

async function singUp (req,res) {
    const {name, email, password} = req.body;
    const validation = singUpSchema.validate(req.body, {abortEarly:false});
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message)
        return res.status(422).send(console.log(erroMessage))
    }
    try {
        const passwordHash = bcrypt.hashSync(password, 12);
        await db.collection(`users`).insertOne({...req.body,password: passwordHash});
        return res.send(201)

    } catch (error) {
        console.log(error)
        return res.send(500)
    }
}

async function singIn (req,res) {
    const {email, password} = req.body;
    try {
        const user = await db.collection(`users`).findOne({email: email})
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuidv4();
            await db.collection(`sessions`).insertOne({userId: user._id, token})
            return res.send({token: token, name: user.name});
        }
        else {
            return res.status(401)
        }
    } catch (error) {
        return res.sendStatus(500)
    }
}

export {singIn,singUp}