const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const ErrorHandler = require('./middleWares/error.handler.middleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api', require('./routes/index'));

const ErrorHandler = require('./middleWares/error.handler.middleware');
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

module.exports = app;
