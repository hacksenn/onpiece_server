const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController()

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