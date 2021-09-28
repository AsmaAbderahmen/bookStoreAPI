const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/', userController.userCreation);

router.post('/check-existance', userController.checkUserExistance);

module.exports = router;
