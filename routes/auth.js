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

router.get('/logout', async (req, res) => {
    await req.session.destroy();
    
    await res.clearCookie('connect.sid');
    // req.session = null;
    nicname = "";  

    //   res.render(`home/index`, {nicname:""});
       res.redirect('/')    
        
});



module.exports = router;