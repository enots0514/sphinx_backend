const express = require('express');
const router = express.Router();
const userRegister = require('../passport/user-register');
const strategy = require('../passport/strategy');



router.get('/login', (req, res) => {
    res.render(`auth/login`);
});

router.post('/login', strategy.login );

router.get('/register', (req, res) => {
    res.render(`auth/register`);
});

router.post('/register', userRegister.register.usercheck, userRegister.register.usersave );

router.get('/logout', (req, res) => {

    req.session.save((err) => {
        if(err) console.log(err);
        nicname = " ";
        res.render('home/index', {nicname:nicname});
        
    });
   
    
});



module.exports = router;