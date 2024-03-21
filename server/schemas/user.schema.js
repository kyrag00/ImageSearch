const Joi = require("joi");

const imageSchema = Joi.object({
    user: Joi.string(),
    link: Joi.string().required()
});

module.exports = {imageSchema}