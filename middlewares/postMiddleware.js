import postValueSchema from "../schemas/post.js";

function postValidation(req,res,next) {
    const validation = postValueSchema.validate(req.body, {abortEarly: false})
    if (validation.error) {
        const erroMessage = validation.error.details.map(value => value.message);
        return res.status(422).send(console.log(erroMessage))
    }
    next();
}

export default postValidation;