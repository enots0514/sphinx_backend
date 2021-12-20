const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


const home = require('./routes/home');
const auth = require('./routes/auth');
const contents = require('./routes/contents');

// const pug = require('pug');

const passportConfig = require('./passport');
// passport폴더에 있는 index.js를 의미함.


passportConfig();
// passport폴더에 있는 index.js의 serializeUser(), deserializeUser() 실행을 의미함.

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
 
 
app.use(passport.initialize()); 
// 패스포트 사용 및 초기화를 위한 express.js 설정임 
app.use(passport.session()); 
// 패스포트에 세션을 사용하도록 함.
// app.get('/', (req, res) => {
//     res.render(`test`);
// });

app.use('/', home);
app.use('/auth', auth);
app.use('/contents', contents);



module.exports = app;