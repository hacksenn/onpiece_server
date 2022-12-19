const express = require('express');
const router = express.Router();
const Joi = require('joi');

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

router.post('/', signupController.createSignup);
router.get('/emailNnickname', signupController.checkUser);

module.exports = router;
