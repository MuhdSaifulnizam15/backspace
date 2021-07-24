const express = require('express');
const { cityController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { cityValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth('manageCity'), validate(cityValidation.createCity), cityController.createCity);
router.get('/', auth('getCitys'), validate(cityValidation.getCitys), cityController.getCitys);
router.get('/state/:stateId', auth('getCity'), validate(cityValidation.getCityByState), cityController.getCityByState);
router.get('/:cityId', auth('getCityByState'), validate(cityValidation.getCity), cityController.getCity);
router.post('/update/:cityId', auth('manageCity'), validate(cityValidation.updateCity), cityController.updateCity);
router.post('/delete/:cityId', auth('manageCity'), validate(cityValidation.deleteCity), cityController.deleteCity);

module.exports = router;