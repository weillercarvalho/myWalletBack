import express from 'express';
import {singIn,singUp} from "../controllers/singInUpControllers.js";
import singUpValidation from '../middlewares/singupMiddleware.js';

const singrouter = express.Router();

singrouter.post(`/singin`, singIn);
singrouter.post(`/singup`,singUpValidation, singUp);


export default singrouter;
