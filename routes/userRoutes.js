const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/new', userController.userCreation);

router.post('/check-existance', userController.checkUserExistance);

module.exports = router;
