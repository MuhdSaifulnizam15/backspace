
const Joi = require('joi');

const createProduct = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category_id: Joi.number().required(),
    }),
};

const updateProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    })
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().required(),
    })
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
};