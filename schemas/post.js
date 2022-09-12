import joi from 'joi';

const postValueSchema = joi.object({
    value: joi.number().required(),
    description:joi.string().empty(" ").required(),
    type: joi.string().required()
});

export default postValueSchema;