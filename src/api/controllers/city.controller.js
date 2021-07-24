const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cityService } = require('../services');

const createCity = catchAsync(async (req, res) => {
    const city = await cityService.createCity(req.body);
    res.status(httpStatus.CREATED).send({ status: true, code: '0000', city});
});

const getCitys = catchAsync(async (req, res) => {
    const result = await cityService.getAllCity();
    res.send({ status: true, code: '0000', result });
});

const getCityByState = catchAsync(async (req, res) => {
    const result = await cityService.getCityByStateId(req.params.stateId);
    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
    }
    res.send({ status: true, code: '0000', result });
});

const getCity = catchAsync(async (req, res) => {
    const result = await cityService.getCityById(req.params.cityId);
    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'City not found');
    }
    res.send({ status: true, code: '0000', result });
});

const updateCity = catchAsync(async (req, res) => {
    const city = await cityService.updateCityById(req.params.cityId, req.body);
    res.send({ status: true, code: '0000', city });
});

const deleteCity = catchAsync(async (req, res) => {
    await cityService.deleteCityById(req.params.cityId);
    res.send({ status: true, code: '0000', message: 'City successfully deleted' });
});

module.exports = {
    createCity,
    getCity,
    getCityByState,
    getCitys,
    updateCity,
    deleteCity,
};