const express = require("express");
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController()

//==================================
//             댓글 수정
//==================================
router.put('/comments/:commentId', commentController.UpdateComment)

//==================================
//             댓글 삭제
//==================================
router.delete("/comments/:commentId", commentController.DeleteComment);

//==================================
//           단일 댓글 조회
//==================================
router.get("/comments/:commentId", commentController.FindOneComment);

//==================================
//             댓글 작성
//==================================
router.post('/:postId/comments', commentController.CreateComment)

//==================================
//             댓글 조회
//==================================
router.get("/:postId/comments", commentController.FindAllComment);





module.exports = router