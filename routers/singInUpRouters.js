import express from 'express';
import {singIn,singUp} from "../controllers/singInUpControllers.js";

const singrouter = express.Router();

singrouter.post(`/singup`, singUp);
singrouter.post(`/singin`, singIn);

export default singrouter;
