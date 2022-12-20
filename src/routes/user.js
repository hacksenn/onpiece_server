const express = require("express");
const router = express.Router();

const authUser = require('../middleWares/authUser.middleware');
const UserController = require('../controllers/user.controller');
const LoginController = require('../controllers/login.controller');
const userController = new UserController()
const loginController = new LoginController()

//==================================
//        Login - 로그인
//==================================
router.post("/login", authUser, loginController.Login);

//==================================
//        작성한 스터디 목록 조회
//==================================
router.get("/:userId/posts", userController.FindAllUserPosts);

//==================================
//        신청한 스터디 목록 조회
//==================================
router.get("/:userId/apply", userController.FindAllUserApply);

//==================================
//           유저 정보 조회
//==================================
router.get("/:userId", userController.GetUser);

//==================================
//           유저 정보 수정
//==================================
router.put('/:userId', userController.UpdateUser)

module.exports = router