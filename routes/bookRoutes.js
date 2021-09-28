const bookController = require('../controllers/bookController');
const express = require('express');
const check_auth = require('../middlewares/token_verification');
const upload = require('../middlewares/upload_photos');
const router = express.Router();

module.exports = router;