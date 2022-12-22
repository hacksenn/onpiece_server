const express = require('express');
const router = express.Router();
const authUser = require('../middleWares/authUser.middleware');

router.use('/users', require('./user'));
router.use('/posts', require('./comment'));
router.use('/posts', require('./post'));

module.exports = router;
