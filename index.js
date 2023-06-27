//starting up express server
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//to make res readable
app.use(express.urlencoded({extended: true}));

//cookie parser
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

//use express router
app.use('/', require('./routes'));

//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, (err)=>{
    if(err) console.log(`error in running server: ${err}`);

    console.log(`Server is running on port: ${port}`);
});
