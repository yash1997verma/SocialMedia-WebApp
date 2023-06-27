const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');


router.get('/profile', usersController.profile);

router.get('/signUp' ,usersController.signUp);
router.get('/signIn' ,usersController.signIn);

router.post('/create', usersController.create);

module.exports =  router;