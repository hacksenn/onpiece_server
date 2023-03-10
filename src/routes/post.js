const express = require('express');
const router = express.Router();

const authUser = require('../middleWares/authUser.middleware');
const PostController = require('../controllers/post.controller');
const postController = new PostController();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

//==================================
//           스터디 통계
//==================================
router.get('/statics', userController.getPostsData);

// 게시글 작성
router.post('/', authUser, postController.createPost);
// 게시글 수정
router.put('/:postId',authUser, postController.updatePost);
// 게시글 삭제
router.delete('/:postId',authUser, postController.deletePost);
// 게시글 전체조회
router.get('/', authUser,postController.getPosts);
// 게시글 상세조회
router.get('/:postId', authUser,postController.getPostById);
// 스터디 신청
router.post('/:postId/apply', authUser,postController.applyStudy);
// 스터디 신청 취소
router.delete('/:postId/apply', authUser,postController.cancleStudyApply);



module.exports = router;
