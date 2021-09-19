const express = require('express');
const {getRegister, postRegister} = require('../controller/register.js');

const router = express.Router()

router.get('/', getRegister)
router.post('/data', postRegister)


module.exports = router