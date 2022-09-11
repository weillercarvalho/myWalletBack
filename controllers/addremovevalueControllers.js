import joi from "joi";
import db from "../db.js";

const postValueSchema = joi.object({
    value: joi.number().required(),
    description:joi.string().empty(" ").required(),
    type: joi.string().required()
})

async function addValue (req,res) {
    const {value, description, type} = req.body;
    const validation = postValueSchema.validate(req.body, {abortEarly: false})
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message);
        return res.status(422).send(console.log(erroMessage))
    }
    try {
        await db.collection(`values`).insertOne({value,description,type});
        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function removeValue (req, res) {
    const {value, description, type} = req.body;
    const validation = postValueSchema.validate(req.body, {abortEarly: false})
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message);
        return res.status(422).send(console.log(erroMessage))
    }
    try {
        await db.collection(`values`).insertOne({value,description,type});
        return res.sendStatus(201)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export {addValue, removeValue}