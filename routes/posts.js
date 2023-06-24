const express = require('express');
const router = express.Router();

const postsController =  require('../controllers/postsController');

router.get('/pos', postsController.posts);

module.exports = router;