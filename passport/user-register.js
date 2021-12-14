const mongoose = require('mongoose');
const users = require('../models/userSchema');



/* 암호화 없는 회원등록 일반 방식
//* 아래 단축형으로 변환
module.exports.usercheck = (req, res, next) => {
   
    users.find({email : req.body.email})
       .then( user => {
          
             if(user.length>0) {
                res.render('auth/register', {formTitle:"아이디가 이미 존재합니다."});
                return;
             }
             else{
                 next();}
         });
};

module.exports.usersave = (req, res) => {
   
 if(req.body.pwd !== req.body.confirm) {
        res.render('auth/register', {formTitle:"비번이 일치하지 않습니다."});
            return;
           } else  {
                
            let user = new users({
                email : req.body.email,
                nicname : req.body.nicname,
                pwd : req.body.pwd
             });
     
             user.save()
                       .then( result => 
                        res.render('auth/login', {formTitle:`${result.nicname}님 회원가입에 성공하셨습니다.`})
                        );
                    }    
};


*/ 

// 단축형
const register = {

    usercheck : (req, res, next) => {   
                  users.find({email : req.body.email})
                 .then( user => {                    
                         if(user.length>0) {
                             res.render('auth/register', {formTitle:"아이디가 이미 존재합니다."});
                             return;
                         }
                         else{
                             next();}
                     })
                  },
 
     usersave : (req, res) => {   
                     if(req.body.pwd !== req.body.confirm) {
                         res.render('auth/register', {formTitle:"비번이 일치하지 않습니다."});
                             return;
                             } else  {                                
                             let newuser = new users({
                                 email : req.body.email,
                                 nicname : req.body.nicname,
                                 pwd : req.body.pwd
                                 });
                         
                                 newuser.save()
                                         .then( result => 
                                         res.render('auth/login', {formTitle:`${result.nicname}님 회원가입에 성공하셨습니다.`})
                                         );
                                     }    
                 }
 
 };
 
 
 module.exports = {register};

      
   
 


