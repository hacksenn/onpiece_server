const express = require('express');
const router = express.Router();

// router.use('/posts', require('./comment'))
router.use('/posts', require('./post'));

router.use('/signup', require('./signup'));
module.exports = router;
