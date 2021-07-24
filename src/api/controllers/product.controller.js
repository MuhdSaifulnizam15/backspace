const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).send({ status: true, code: '0000', product });
});

const getProducts = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sort', 'limit', 'page']);
    const result = await productService.getAllProduct(options);
    res.send({ status: true, code: '0000', result });
});

const getProduct = catchAsync(async (req, res) => {
    const result = await productService.getProductById(req.params.productId);
    if(!result){
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send({ status: true, code: '0000', result });
});

const updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProductById(req.params.productId, req.body);
    res.send({ status: true, code: '0000', product });
});

const deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProductById(req.params.productId);
    res.send({ status: true, code: '0000', message: 'Product successfully deleted' });
});

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};