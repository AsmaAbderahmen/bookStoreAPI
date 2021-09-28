const bookController = require('../controllers/bookController');
const express = require('express');
const check_auth = require('../middlewares/token_verification');
const upload = require('../middlewares/upload_photos');
const router = express.Router();

router.get('/:_id/details', check_auth, bookController.details);

router.get('/:per_page/:page_number', check_auth, bookController.list);

router.post('/check-existance', check_auth, bookController.checkExistance);

router.post('/new', check_auth, upload.single('image'), bookController.create);

router.post('/:_id', check_auth, upload.single('image'), bookController.update);

router.delete('/:_id', check_auth, bookController.delete);

module.exports = router;