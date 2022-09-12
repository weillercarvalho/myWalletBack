import express from 'express';
import {addValue,removeValue} from "../controllers/addremovevalueControllers.js";
import postValidation from '../middlewares/postMiddleware.js';

const valuerouter = express.Router();

valuerouter.post(`/addvalue`,postValidation, addValue);
valuerouter.post(`/removevalue`,postValidation, removeValue);

export default valuerouter;
