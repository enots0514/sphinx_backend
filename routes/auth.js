const express = require('express');
const router = express.Router();
const userRegister = require('../passport/user-register');
const strategy = require('../passport/strategy');
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render(`auth/login`, {formTitle:req.flash().error});
});

// passport없이 로그인 시
// router.post('/login', strategy.login );

// passport 활용해 로그인 시
 router.post('/login', 
    passport.authenticate("local", {
        failureRedirect: '/auth/login',
        successRedirect: "/",
        failureFlash:true,
        // successFlash:true 
       })   
  );

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