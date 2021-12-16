const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const home = require('./routes/home');
const auth = require('./routes/auth');
const contents = require('./routes/contents');

// const pug = require('pug');



// app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));
 app.use(express.json());

 app.use(cookieParser());
 app.use(expressSession(
     {   
         resave:false,
         saveUninitialized:false,
        //  key:'spcs',
         secret: process.env.COOKIESECRET,
         cookie: {
            path : "/"
          } 
     }));

 app.use(flash());    
// app.get('/', (req, res) => {
//     res.render(`test`);
// });

app.use('/', home);
app.use('/auth', auth);
app.use('/contents', contents);



module.exports = app;