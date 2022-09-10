import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import dayjs from "dayjs";
import "dayjs/locale/pt-br.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

let db;

mongoClient.connect().then(() => {
    db = mongoClient.db(`mywallet`)
});

const singUpSchema = joi.object({
    name: joi.string().empty(" ").min(1).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).empty(" ").min(1).max(30).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

const postValueSchema = joi.object({
    value: joi.number().required(),
    description:joi.string().empty(" ").required(),
    type: joi.string().required()
})

server.post(`/singup`, async (req,res) => {
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
})

server.post(`/singin`, async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await db.collection(`users`).findOne({email: email})
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuidv4();
            await db.collection(`sessions`).insertOne({userId: user._id, token})
            return res.send({token: token, name: user.name});
        }
        else {
            return res.status(401).send({message: `Email ou senha incorretos.`})
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

server.post(`/addvalue`, async (req,res) => {
    console.log(req.body);
})

server.post(`/removevalue`, async (req, res) => {
    console.log(req.body);
})

server.get(`/result`, async (req,res) => {
    
})



server.listen(5000,() => {
    console.log(`Listening on the port 5000`)
})
