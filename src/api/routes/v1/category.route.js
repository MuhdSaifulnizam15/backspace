const express = require('express');
const { categoryController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth('manageCategory'), validate(categoryValidation.createCategory), categoryController.createCategory);
router.get('/', auth('getCategories'), validate(categoryValidation.getCategories), categoryController.getCategories);
router.get('/:categoryId', auth('getCategory'), validate(categoryValidation.getCategory), categoryController.getCategory);
router.post('/update/:categoryId', auth('manageCategory'), validate(categoryValidation.updateCategory), categoryController.updateCategory);
router.post('/delete/:categoryId', auth('manageCategory'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;