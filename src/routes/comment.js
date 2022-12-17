const express = require("express");
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController()

//==================================
//
//            댓글 작성
//
//==================================
router.post('/:postId/comments', commentController.CreateComment)

//==================================
//
//            댓글 수정
//
//==================================
router.post('/comments/:commentId', commentController.UpdateComment)
