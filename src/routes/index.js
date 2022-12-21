const express = require('express');
const router = express.Router();
const authUser = require('../middleWares/authUser.middleware');

router.use('/users', require('./user'));
router.use('/posts', authUser, require('./comment'));
router.use('/posts', authUser, require('./post'));
router.use('/posts', require('./user'));

module.exports = router;
