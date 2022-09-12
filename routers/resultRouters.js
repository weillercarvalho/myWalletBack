import express from 'express';
import {getResultsfromValues} from '../controllers/getresultControllers.js'

const resultrouter = express.Router();

resultrouter.get(`/result`, getResultsfromValues);

export default resultrouter;


