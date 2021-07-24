const httpStatus = require('http-status');
const { City, State } = require('../models');
const ApiError = require('../utils/ApiError');

const createCity = async (userBody) => {
    if(await City.isNameTaken(userBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'city already exist.');
    }
    const state = await State.find({ state_id: userBody.state_id });
    if(!state){
        throw new ApiError(httpStatus.BAD_REQUEST, 'state not found.');
    }
    userBody.state_id = state[0]._id;
    const city = await City.create(userBody);
    return city;
};

const getAllCity = async () => {
    const citys = await City.find({}).populate(['state_id']);
    return citys;
};

const getCityByStateId = async (stateId) => {
    const city = await City.find({ state_id: stateId }).populate(['state_id']);
    return city;
};

const getCityById = async (id) => {
    return City.findById(id).populate(['state_id']);
};

const updateCityById = async (cityId, updateBody) => {
    const city = await getCityById(cityId);
    if(!city){
        throw new ApiError(httpStatus.BAD_REQUEST, 'City not found');
    }
    Object.assign(city, updateBody);
    await city.save();
    return city;
};

const deleteCityById = async (cityId) => {
    const city = await getCityById(cityId);
    if(!city){
        throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
    }
    await city.remove();
    return city;
};

module.exports = {
    createCity,
    getAllCity,
    getCityByStateId,
    getCityById,
    updateCityById,
    deleteCityById,
};