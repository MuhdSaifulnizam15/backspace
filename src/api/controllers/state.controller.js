const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stateService } = require('../services');

const createState = catchAsync(async (req, res) => {
    const state = await stateService.createState(req.body);
    res.status(httpStatus.CREATED).send({ status: true, code: '0000', state });
});

const getStates = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sort', 'limit', 'page']);
    const result = await stateService.getAllState(options);
    res.send({ status: true, code: '0000', result });
});

const getState = catchAsync(async (req, res) => {
    const result = await stateService.getStateById(req.params.stateId);
    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'State not found');
    }
    res.send({ status: true, code: '0000', result });
});

const updateState = catchAsync(async (req, res) => {
    const state = await stateService.updateStateById(req.params.stateId, req.body);
    res.send({ status: true, code: '0000', state });
});

const deleteState = catchAsync(async (req, res) => {
    await stateService.deleteStateById(req.params.stateId);
    res.send({ status: true, code: '0000', message: 'State successfully deleted' });
});

module.exports = {
    createState,
    getState,
    getStates,
    updateState,
    deleteState,
};