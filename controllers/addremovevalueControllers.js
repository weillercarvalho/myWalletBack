import joi from "joi";
import db from "../db.js";



async function addValue (req,res) {
    const {value, description, type} = req.body;
    try {
        await db.collection(`values`).insertOne({value,description,type});
        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function removeValue (req, res) {
    const {value, description, type} = req.body;
    try {
        await db.collection(`values`).insertOne({value,description,type});
        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export {addValue, removeValue}