const express = require('express');
const router = express.Router();
const { insertData, getImageCarousel } = require('../controllers/caraouselController');

router.post('/insert', insertData);
router.get('/imageCaraousel', getImageCarousel);

module.exports = router;
