const { ValidationError, AuthenticationError, ExistError } = require('../middleWares/exceptions/error.class');
const url = require("url");
require('dotenv').config({ path: '../.env' });

const UserService = require('../services/user.service');

class UserController {
    userService = new UserService();

    GetUser = async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await this.userService.FindUser(userId);
            res.json({
                data: user,
            });
        } catch (error) {
            next(error);
        }
    };

    UpdateUser = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { description } = req.body;

            if (!userId) {
                throw new ValidationError('유저 권한이 없습니다.', 401);
            }
            if (!description) {
                throw new ValidationError('소개글을 작성 해주세요.', 412);
            }

            await this.userService.UpdateUser(userId, description);
            return res.status(200).json({ msg: '소개글을 수정하였습니다.' });
        } catch (error) {
            next(error);
        }
    };

    FindAllUserPosts = async (req, res, next) => {
        try {
            const { userId } = req.params;

            const posts = await this.userService.FindAllUserPosts(userId);
            res.json({
                data: posts,
            });
        } catch (error) {
            next(error);
        }
    };

    FindAllUserApply = async (req, res, next) => {
        try {
            const { userId } = req.params;

            const posts = await this.userService.FindAllUserApply(userId);
            res.json({
                data: posts,
            });
        } catch (error) {
            next(error);
        }
    };

    createSignup = async (req, res, next) => {
        try {
            const { email, nickname, password, confirm, description } = req.body;

            await this.userService.createSignup(
                email,
                nickname,
                password,
                confirm,
                description
            );

            console.log(`${nickname} 님이 가입하셨습니다.`);
            res.status(201).send({ message: "회원 가입에 성공하였습니다." });
        } catch (error) {
            next(error)
        }
    };

    checkUser = async (req, res, next) => {
        try {
            const queryData = url.parse(req.url, true).query;

            const { email, nickname } = queryData

            if(!email && !nickname){
                throw new AuthenticationError(
                    '중복 검사에 실패하였습니다.', 412
                )
            }

            await this.userService.checkUser(
                email,
                nickname
            );
            res.status(200).json({ msg: '중복검사가 완료되었습니다.' })
        } catch (error) {
            next(error)
        }
    }

    Login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ExistError(
                    '이메일 혹은 패스워드를 다시 입력해주세요', 404
                )
            }
            const existUser = await this.userService.existUser(email, password);
            const accessToken = this.userService.createAccessToken(existUser.userId);

            return res.header('token', accessToken).status(200).json({ token: accessToken });
        } catch (error) {
            next(error);
        }
    };

}


module.exports = UserController;
