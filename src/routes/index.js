const express = require('express');
const router = express.Router();

router.use('/posts', require('./comment'))

module.exports = router;
