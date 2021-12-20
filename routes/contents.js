const express = require('express');
const router = express.Router();

/*
const enter = (req, res, next) => {
    if(req.session.isLogin) {
        nicname = `에 ${req.session.nickNAME}님 로그인 하셨습니다.`;
        // console.log(req.session.nickNAME);
        
        next();
    }
    else {
        res.render(`home/index`, {logincheck:"로그인해야 볼 수 있습니다"});
            return;
    }

}  

*/

const enter = (req, res, next) => {

    // console.log(`req.user: ${req.user}`);
    if(req.user) {
        nicname = `에 ${req.user.nicname}님 로그인 하셨습니다.`;
        // console.log(req.session.nickNAME);
        
        next();
    }
    else {
        res.render(`home/index`, {logincheck:"로그인해야 볼 수 있습니다"});
            return;
    }

}  




router.get('/nodejs', enter, (req, res) => {
    res.render('contents/01_nodejs', {"thema":"nodejs"});
})

router.get('/express', enter, (req, res) => {
    res.render('contents/02_express', {"thema":"express"});
})

router.get('/pug', (req, res) => {
    res.render('contents/04_pug', {"thema":"pug"});
})



module.exports = router;