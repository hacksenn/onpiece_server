const express = require('express');
const router = express.Router();

// router.use('/posts', require('./comment'))
router.use('/users', require('./user'))
router.use('/signup', require('./signup'))
// router.use('/posts', require('./post'));

module.exports = router;
