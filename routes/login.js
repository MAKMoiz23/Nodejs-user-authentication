const express = require('express');
const {getLogin, postLogin} = require('../controller/login.js');

const router = express.Router()

router.get('/', getLogin)
router.post('/data', postLogin)


module.exports = router