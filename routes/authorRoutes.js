const authorController = require('../controllers/authorController');
const express = require('express');
const check_auth = require('../middlewares/token_verification');
const upload = require('../middlewares/upload_photos');

const router = express.Router();

router.post('/check-existance', check_auth, authorController.checkExistance);

router.post('/new', check_auth, upload.single('image'), authorController.create);

router.get('/:per_page/:page_number', check_auth, authorController.list);

module.exports = router;
