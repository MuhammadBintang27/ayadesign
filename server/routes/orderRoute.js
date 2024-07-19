const express = require('express');
const router = express.Router();
const { insertData, getImageCarousel } = require('../controllers/caraouselController');
const { addToCart, getItemCart, removeFromCart } = require('../controllers/orderController');

router.post('/insert', insertData);
router.get('/imageCaraousel', getImageCarousel);
router.post('/cart', addToCart);
router.get('/cart', getItemCart);
router.delete('/cart/:id', removeFromCart);



module.exports = router;
