const express = require('express');
const { stateController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { stateValidation } = require('../../validations');

const router = express.Router();

router.post('/', auth('manageState'), validate(stateValidation.createState), stateController.createState);
router.get('/', auth('getStates'), validate(stateValidation.getStates), stateController.getStates);
router.get('/:stateId', auth('getState'), validate(stateValidation.getState), stateController.getState);
router.post('/update/:stateId', auth('manageState'), validate(stateValidation.updateState), stateController.updateState);
router.post('/delete/:stateId', auth('manageState'), validate(stateValidation.deleteState), stateController.deleteState);

module.exports = router;