const express = require('express');
const router = express.Router();
const { userRegistration } = require('../controllers/');
const { handleValidationErrors } = require('../../../helpers/');
const { validateUserRegistration } = require('../validators/userAuthValidation');

router.post('/signUp', validateUserRegistration, handleValidationErrors, userRegistration);


module.exports = router;