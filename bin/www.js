const app = require('../app'); 
const mongoose = require('mongoose');


const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || MONGO_URI;

mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
                .then( console.log(`몽고디비 연결 성공`))
                .then(  app.listen(PORT, () => {
                        console.log(`웹 서버가 localhost:${PORT}에서 실행`)
                       })                             
                )
                .catch( err => console.log(err))
