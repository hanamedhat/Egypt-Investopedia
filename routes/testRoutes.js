const test = require('../controllers/chat')
const express = require('express');
const router = express.Router();


router.get('/indexx',test.gettest)

module.exports = router;