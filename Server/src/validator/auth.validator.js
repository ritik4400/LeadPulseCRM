const Joi = require('joi');

const signupSchema = Joi.object({
    username:Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    companyId:Joi.string().required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

module.exports = {
    signupSchema,
    loginSchema
}