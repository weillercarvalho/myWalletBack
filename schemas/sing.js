import joi from 'joi';

const singUpSchema = joi.object({
    name: joi.string().empty(" ").min(1).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).empty(" ").min(1).max(30).required(),
    password: joi.string().empty(" ").min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export default singUpSchema;