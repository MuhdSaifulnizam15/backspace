const express = require('express');
const { productController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth('manageProduct'), validate(productValidation.createProduct), productController.createProduct);
router.get('/', auth('getProducts'), validate(productValidation.getProducts), productController.getProducts);
router.get('/:productId', auth('getProduct'), validate(productValidation.getProduct), productController.getProduct);
router.post('/update/:productId', auth('manageProduct'), validate(productValidation.updateProduct), productController.updateProduct);
router.post('/delete/:productId', auth('manageProduct'), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;