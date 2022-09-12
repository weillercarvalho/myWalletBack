import singUpSchema from "../schemas/sing.js";

function singUpValidation(req,res,next) {
    const validation = singUpSchema.validate(req.body, {abortEarly:false});
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message)
        return res.status(422).send(console.log(erroMessage))
    }
    next();
}

export default singUpValidation;