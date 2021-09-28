const authController = require('../controllers/authController.js');
const express = require('express');
const check_auth = require('../middlewares/token_verification');
const router = express.Router();

module.exports = router;
