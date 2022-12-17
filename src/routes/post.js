const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/', postController.createPost);
router.get('/:postId', postController.getPostById);

module.exports = router;
