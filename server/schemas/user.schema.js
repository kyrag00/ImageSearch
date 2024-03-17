const Joi = require("joi");

// const imageSchema = Joi.object({
//     title: Joi.string().required(),
//     byteSize: Joi.number().required(),
//     url: Joi.string().required()
// })
const imageSchema = Joi.object({
    user: Joi.string().required(),
    likedImages: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            byteSize: Joi.number(),
            url: Joi.string().required()
        })
    ).required()
});

module.exports = {imageSchema}