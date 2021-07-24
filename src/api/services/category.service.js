const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const createCategory = async (userBody) => {
    if(await Category.isNameTaken(userBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'category already exist.');
    }
    const category = await Category.create(userBody);
    return category;
};

const getAllCategory = async (options) => {
    const categories = await Category.paginate({}, options);
    return categories;
};

const getCategoryById = async (id) => {
    return Category.findById(id);
};

const updateCategoryById = async (categoryId, updateBody) => {
    const category = await getCategoryById(categoryId);
    if(!category){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
    }
    Object.assign(category, updateBody);
    await category.save();
    return category;
};

const deleteCategoryById = async (categoryId) => {
    const category = await getCategoryById(categoryId);
    if(!category){
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    await category.remove();
    return category;
};

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};