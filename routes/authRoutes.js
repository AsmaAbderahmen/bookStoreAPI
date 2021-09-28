const authController = require('../controllers/authController.js');
const express = require('express');
const check_auth = require('../middlewares/token_verification');
const router = express.Router();


router.post('/signin', authController.signin);

router.post('/refresh-token', authController.refresh_token);

router.post('/change-password', check_auth, authController.change_password);

router.post('/forget-password/send-email', authController.forget_password_send_email);

router.post('/forget-password/verify-code', authController.forget_password_verify_code);

router.post('/forget-password/new-password', authController.change_password_on_recovering);


module.exports = router;
