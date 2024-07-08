// routes/authRoute.js
const express = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');
const { protect } = require('../middlewares/authMiddleware');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../client/public/uploads')); 
    },
    filename: function (req, file, cb) {
      cb(null, req.user.name + '-' + Date.now() + '-' + file.originalname); 
    }
  });

const upload = multer({ storage: storage });

router.post('/upload-image', protect, upload.single('image'), authController.uploadImage);
router.put('/profile-update', protect, authController.updateProfileController); 
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
