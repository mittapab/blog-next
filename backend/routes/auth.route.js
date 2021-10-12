const express = require('express')
const auth = require("./../controllers/auth.controller")
const router = express.Router();

// validate

const authSignup = require('./../validate/index.valid')
const  authValid = require('./../validate/auth.valid')

router.post("/signup" , authValid.userSignupValidator , authSignup.runValidation , auth.signup)
router.post("/signin" , authValid.userSigninValidator , authSignup.runValidation , auth.signin)
router.get("/signout" , auth.signout)

router.get("/secret" , auth.requireSignin , (req , res) => {
    res.status(200).json({ message: "Secret of signin"})
})

module.exports = router;