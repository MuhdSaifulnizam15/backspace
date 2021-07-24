const httpStatus = require('http-status');
const { State } = require('../models');
const ApiError = require('../utils/ApiError');

const createState = async (userBody) => {
    if(await State.isNameTaken(userBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'state already exist.');
    }
    if(await State.isIdTaken(userBody.state_id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'state id already exist.');
    }
    const state = await State.create(userBody);
    return state;
};

const getAllState = async (options) => {
    console.log(options);
    const states = await State.paginate({}, options);
    return states;
};

const getStateById = async (id) => {
    return State.findById(id);
};

const updateStateById = async (stateId, updateBody) => {
    const state = await getStateById(stateId);
    if(!state){
        throw new ApiError(httpStatus.BAD_REQUEST, 'State not found');
    }
    Object.assign(state, updateBody);
    await state.save();
    return state;
};

const deleteStateById = async (stateId) => {
    const state = await getStateById(stateId);
    if(!state){
        throw new ApiError(httpStatus.NOT_FOUND, 'State not found');
    }
    await state.remove();
    return state;
};

module.exports = {
    createState,
    getAllState,
    getStateById,
    updateStateById,
    deleteStateById,
};