const express = require("express");
const router = express.Router();

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController()
const authUser = require('../middleWares/authUser.middleware');

//==================================
//             댓글 수정
//==================================
router.put('/comments/:commentId', authUser,commentController.UpdateComment)

//==================================
//             댓글 삭제
//==================================
router.delete("/comments/:commentId",authUser, commentController.DeleteComment);

//==================================
//           단일 댓글 조회
//==================================
router.get("/comments/:commentId", authUser,commentController.FindOneComment);

//==================================
//             댓글 작성
//==================================
router.post('/:postId/comments', authUser,commentController.CreateComment)

//==================================
//             댓글 조회
//==================================
router.get("/:postId/comments",authUser, commentController.FindAllComment);





module.exports = router