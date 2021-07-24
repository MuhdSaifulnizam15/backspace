const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    res.status(httpStatus.CREATED).send({ status: true, code: '0000', category });
});

const getCategories = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sort', 'limit', 'page']);
    const result = await categoryService.getAllCategory(options);
    res.send({ status: true, code: '0000', result });
});

const getCategory = catchAsync(async (req, res) => {
    const result = await categoryService.getCategoryById(req.params.categoryId);
    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    res.send({ status: true, code: '0000', result });
});

const updateCategory = catchAsync(async (req, res) => {
    const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
    res.send({ status: true, code: '0000', category });
});

const deleteCategory = catchAsync(async (req, res) => {
    await categoryService.deleteCategoryById(req.params.categoryId);
    res.send({ status: true, code: '0000', message: 'Category successfully deleted' });
});

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};