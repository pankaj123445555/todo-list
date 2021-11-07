const express= require('express');

const app = express();

const port = 8000;


const cookieParser = require('cookie-parser');
// start of using database in index.js
const db = require('./config/mongoose');
const Works = require('./models/works');
// end of using database in index.js

// this is for the session cookie
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// ending for the session cookie


// adding flash library 
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
// ending flash libraray

 
// use router in index.js
app.use(cookieParser());
app.use(express.urlencoded()); 

// now adding the express session cookie permanently
app.use(session({
    name: 'codial',
    // todo change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove: 'disable'
    }, function(err){
        console.log('error in connecting to mongo store'||'connect mongodb server setup completed')
    })
}));
// end of the express session

// using flash this using session cookie
app.use(flash());
app.use(customMiddleware.createflash);
// end


app.use('/',require('./routes/index'));



// starting of setting up ejs
app.set('view engine', 'ejs');
app.set('views','./views');
// ending of setting up ejs
 
// use images and css in our file
app.use(express.static('assets'));

// end of this file

app.listen(port,function(err){

    if(err)
    {
        console.log(`error on running the server: ${err}`);
        return;
    }
    console.log(`server is running on : ${port}`);
});