const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;



//authentication useing passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function(email, password, done){
        try{
            //find a user and establish the identity
            const user = await User.findOne({email: email });
            if(!user || user.password != password){
                console.log(`Invalid username/password`);
                return done(null,false);
            }
            return done(null, user);
        }catch(err){
            console.log(`error in finding the user ${err}`);
            return done(err);
        }

        

    }
));

//serelizing the user to decide which key is to be kept in the cookies
//this will automatically encrypt the id and store in cookie which is sent to the browser
passport.serializeUser(function(user, done){
    done(null, user.id)
});

//deserializing the user from the key in the cookies
//when the browser sents cookie in req
passport.deserializeUser( async function(id, done){
   try{
    const user = await User.findById(id);
    return done(null, user);

   }catch(err){
    console.log(`error in finding the user ${err}`);
    return done(err);
   }
});

//check if the user is authenticated, this is just a middleware 
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;

