const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

const createProduct = async (userBody) => {
    if(await Product.isNameTaken(userBody.name)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'product already exist.');
    }
    const product = await Product.create(userBody);
    return product;
};

const getAllProduct = async (options) => {
    const categories = await Product.paginate({}, options);
    return categories;
};

const getProductById = async (id) => {
    return Product.findById(id);
};

const updateProductById = async (productId, updateBody) => {
    const product = await getProductById(productId);
    if(!product){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');
    }
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if(!product){
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.remove();
    return product;
};

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};