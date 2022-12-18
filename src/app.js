const express = require('express');
const app = express();
require('dotenv').config('');

const port = process.env.PORT;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api', require('./routes/index'));

const ErrorHandler = require('./middleWares/error.handler.middleware')
app.use(ErrorHandler)

//메인화면 설정
app.get("/", (req, res) => {
  res.send("안녕하세요, 항해99 10기 E반 김혜란 입니다.");
});


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});