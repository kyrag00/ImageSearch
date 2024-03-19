const Joi = require("joi");

// const imageSchema = Joi.object({
//     title: Joi.string(),
//     byteSize: Joi.number(),
//     link: Joi.string().required()
// })
const imageSchema = Joi.object({
    user: Joi.string().required(),
    likedImages: Joi.string().required()
});

module.exports = {imageSchema}