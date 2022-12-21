const express = require('express');
const router = express.Router();

const authUser = require('../middleWares/authUser.middleware');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

//==================================
//           스터디 통계
//==================================
router.get('/login', userController.getPostsData);
//==================================
//           유저 목록
//==================================
router.get('/all', userController.GetUserAll);

//==================================
//              로그인
//==================================
router.post('/login', userController.Login);

//==================================
//            회원 가입
//==================================
router.post('/signup', userController.createSignup);
router.get('/signup/emailNnickname', userController.checkUser);

//==================================
//        작성한 스터디 목록 조회
//==================================
router.get('/:userId/posts', authUser, userController.FindAllUserPosts);

//==================================
//        신청한 스터디 목록 조회
//==================================
router.get('/:userId/apply', authUser, userController.FindAllUserApply);

//==================================
//           유저 정보 조회
//==================================
router.get('/:userId', authUser, userController.GetUser);

//==================================
//           유저 정보 수정
//==================================
router.put('/:userId', authUser, userController.UpdateUser);

module.exports = router;
