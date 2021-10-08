const express = require('express')
const blogControtller = require("./../controllers/blog.controller")

const router = express.Router();


router.get('/' , blogControtller.time)


module.exports = router;