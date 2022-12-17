const express = require('express');
const app = express();
require('dotenv').config('');

const port = process.env.PORT;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api', require('./routes/index'));

app.use(ErrorHandler, require('./middleWares/error.handler.middleware'))


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});