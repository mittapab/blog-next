const express = require('express')
const auth = require("./../controllers/auth.controller")
const router = express.Router();

// validate

const authSignup = require('./../validate/index.valid')
const  authValid = require('./../validate/auth.valid')

router.post("/signup" , authValid.userSignupValidator , authSignup.runValidation , auth.signup)


module.exports = router;