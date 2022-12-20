const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');
const postController = new PostController();

// 게시글 작성
router.post('/', postController.createPost);
// 게시글 수정
router.put('/:postId', postController.updatePost);
// 게시글 삭제
router.delete('/:postId', postController.deletePost);
// 게시글 전체조회
router.get('/', postController.getPosts);
// 게시글 상세조회
router.get('/:postId', postController.getPostById);
// 스터디 신청
router.post('/:postId/apply', postController.applyStudy);
// 스터디 신청 취소
router.delete('/:postId/apply', postController.cancleStudyApply);

module.exports = router;
