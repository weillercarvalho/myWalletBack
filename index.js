import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {singIn,singUp} from "./controllers/singInUpControllers.js";
import {addValue,removeValue} from "./controllers/addremovevalueControllers.js";
import {getResultsfromValues} from "./controllers/getresultControllers.js"

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.post(`/singup`, singUp)

server.post(`/singin`, singIn)

server.post(`/addvalue`, addValue)

server.post(`/removevalue`, removeValue)

server.get(`/result`, getResultsfromValues)



server.listen(5000,() => {
    console.log(`Listening on the port 5000`)
})
