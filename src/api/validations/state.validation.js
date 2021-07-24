
const Joi = require('joi');

const createState = {
    body: Joi.object().keys({
        state_id: Joi.number().required(),
        name: Joi.string().required(),
    }),
};

const updateState = {
    params: Joi.object().keys({
        stateId: Joi.string().required(),
    })
};

const deleteState = {
    params: Joi.object().keys({
        stateId: Joi.string().required(),
    })
};

module.exports = {
    createState,
    updateState,
    deleteState,
};