//starting up express server
const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes'));

//setting up views engine
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, (err)=>{
    if(err) console.log(`error in running server: ${err}`);

    console.log(`Server is running on port: ${port}`);
});
