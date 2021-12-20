const express = require('express');
const router = express.Router();


const enter = (req, res, next) => {

    // console.log(`req.user: ${req.user}`);
    if(req.user) {
        nicname = `에 ${req.user.nicname}님 로그인 하셨습니다.`;
        // console.log(req.session.nickNAME);
        
        next();
    }
    else {
        res.render(`home/index`);
            return;
    }

}  

router.get('/', enter, (req, res) => {
    res.render(`home/index`);
})

router.get('/about', (req, res) => {
    res.render(`home/content`);
})


module.exports = router;