const {check} = require('express-validator')

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage("name is required") ,
    check('email').isEmail().withMessage('email is required'),
    check('password').isLength({min: 6}).withMessage("Password must be at least 6")
]

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Email is required'),
    check('password').isLength({min: 6 }).withMessage("Password must be at least 6 OR Password is required")
]

