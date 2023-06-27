const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postsController');
 


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'))


module.exports = router;