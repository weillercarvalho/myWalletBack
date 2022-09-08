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
})

server.post(`/singin`, async (req,res) => {
    const token = uuidv4(); 
    console.log(req.body)
    return res.send(token)
})

server.post(`/singup`, async (req,res) => {
    try {
        res.send(200)
    } catch (error) {
        console.log(error)
    }
})



server.listen(5000,() => {
    console.log(`Listening on the port 5000`)
})
