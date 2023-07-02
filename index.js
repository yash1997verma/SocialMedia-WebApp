//starting up express server
const express = require('express');
const app = express();
const port = 8000;


//to make res readable
app.use(express.urlencoded({extended: true}));


//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());


const expressLayouts = require('express-ejs-layouts');
// app.use(express.static('assets'));
app.use('/assets', express.static('assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting up DB
const db = require('./config/mongoose');


//maintaining session using mongoDB
const session = require('express-session');
const MongoStore = require('connect-mongo');


//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');


//setting up passport for local use
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'Socialmedia-WebApp',
    //to do, change the secret before deployment
    secret: 'blasomething',
    saveUninitialized:false,
    resave:false ,
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
   
    store: MongoStore.create(
        
        {
            mongoUrl: 'mongodb+srv://root:root@yashdb.ptmfvsc.mongodb.net/',
            autoRemove: 'disabled'
        },
        function(err){
            console.log( err || 'connect-mongodb setup ok');
        }   


    )
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser);


//use express router
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err) console.log(`error in running server: ${err}`);

    console.log(`Server is running on port: ${port}`);
});
