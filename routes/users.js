const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/usersController');


router.get('/profile', passport.checkAuthentication,  usersController.profile);

router.get('/signUp' ,usersController.signUp);
router.get('/signIn' ,usersController.signIn);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:'/users/signIn'},
) ,usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports =  router;