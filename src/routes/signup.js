const express = require("express");
const router = express.Router();

const authLoginUserMiddleware = require("../middlewares/authLoginUserMiddleware.js");

const SignupController = require("../controllers/signup.controller");
const signupController = new SignupController();

router.post('/', authLoginUserMiddleware, signupController.createSignup);


module.exports = router;