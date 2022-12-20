const express = require('express');

const http = require('http')
const https = require('https')
const fs = require('fs')

const options = {
  key : fs.readFileSync('src/rootca.key'),
  cert : fs.readFileSync('src/rootca.crt')
}

const app = express();
require('dotenv').config();

const cors = require('cors')
const corsOption = {
  origin : true,
  withCredential : true
}
app.use(cors(corsOption))


const port = process.env.PORT;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api', require('./routes/index'));

//메인화면 설정
app.get("/", (req, res) => {
  res.send("안녕하세요, 항해99 10기 E반 3조 BE 김혜란, 김혁찬, 노연수 입니다.");
});

const ErrorHandler = require('./middleWares/error.handler.middleware');
app.use(ErrorHandler);


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

http.createServer(app).listen(process.env.HTTP_PORT)
https.createServer(options, app).listen(process.env.HTTPS_PORT)

module.exports = app;
