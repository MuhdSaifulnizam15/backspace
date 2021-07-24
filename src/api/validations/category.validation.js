
const Joi = require('joi');

const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

const updateCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().required(),
    })
};

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().required(),
    })
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
};