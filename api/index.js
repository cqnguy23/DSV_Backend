const express = require('express');
const router = express.Router();
const userApi = require('./users')
/* GET home page. */
router.use('/users', userApi)

module.exports = router;
