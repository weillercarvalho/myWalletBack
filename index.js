import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import singrouter from './routers/singInUpRouters.js';
import resultrouter from './routers/resultRouters.js';
import valuerouter from './routers/valueRouters.js'



dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(singrouter);
server.use(valuerouter);
server.use(resultrouter);






server.listen(5000,() => {
    console.log(`Listening on the port 5000`)
})
