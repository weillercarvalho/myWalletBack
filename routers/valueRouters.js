import express from 'express';
import {addValue,removeValue} from "../controllers/addremovevalueControllers.js";

const valuerouter = express.Router();

valuerouter.post(`/addvalue`, addValue);
valuerouter.post(`/removevalue`, removeValue);

export default valuerouter;
