const UserRepository = require('../repositories/user.repository');
const { InvalidParamsError, ExistError, ValidationError } = require('../middleWares/exceptions/error.class');

require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserService {
    userRepository = new UserRepository();

    FindUser = async (userId) => {
        const user = await this.userRepository.FindOneUser(userId);
        if (user == null || user.length === 0) {
            throw new InvalidParamsError('유저를 찾을 수 없습니다.', 404);
        }
        return user;
    };

    UpdateUser = async (userId, description) => {
        const user = await this.userRepository.FindOneUser(userId);
        if (user == null || user.length === 0) {
            throw new InvalidParamsError('유저를 찾을 수 없습니다.', 404);
        }
        if (Number(userId) !== user.userId) {
            throw new InvalidParamsError('유저 권한이 없습니다.', 401);
        }
        return this.userRepository.UpdateUser(userId, description);
    };

    FindAllUserPosts = async (userId) => {
        const posts = await this.userRepository.FindAllUserPosts(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }

        const postsApplicants = await Promise.all(
            posts.map(async (post) => {
                const postId = post.postId;
                const postApplicants = await this.userRepository.FindAllPostApply(postId);
                return {
                    postId: post.postId,
                    userId: post.userId,
                    nickname: post['User.nickname'],
                    title: post.title,
                    content: post.content,
                    category: (post.category).split(','),
                    level: post.level,
                    headCount: post.headCount,
                    recruitmentEndDay: post.recruitmentEndDay,
                    startTime: post.startTime,
                    endTime: post.endTime,
                    startDay: post.startDay,
                    endDay: post.endDay,
                    applicants: postApplicants,
                };
            })
        );
        return postsApplicants
    };

    FindAllUserApply = async (userId) => {
        const posts = await this.userRepository.FindAllUserApply(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }

        const postsApplicants = await Promise.all(
            posts.map(async (post) => {
                const postId = post.postId;
                const postApplicants = await this.userRepository.FindAllPostApply(postId);
                return {
                    postId: post.postId,
                    userId: post.userId,
                    nickname: post['User.nickname'],
                    title: post['Post.title'],
                    content: post['Post.content'],
                    category: (post['Post.category']).split(','),
                    level: post['Post.level'],
                    headCount: post['Post.headCount'],
                    recruitmentEndDay: post['Post.recruitmentEndDay'],
                    startTime: post['Post.startTime'],
                    endTime: post['Post.endTime'],
                    startDay: post['Post.startDay'],
                    endDay: post['Post.endDay'],
                    applicants: postApplicants,
                };
            })
        );
        return postsApplicants
    };

    existUser = async (email, password) => {
        const secretPW = crypto
            .createHash(process.env.PW_KEY)
            .update(password)
            .digest(process.env.INCOD);

        password = secretPW

        const existUser = await this.userRepository.existUser(email, password)

        if (!existUser || existUser.length === 0) {
            throw new ExistError(
                '로그인 정보를 다시 확인해주세요.', 412
            )
        }
        return existUser;
    }

    createAccessToken = (userId) => {
        return jwt.sign(
            { userId },
            process.env.SECRET_KEY,
            { expiresIn: "60m" }
        );
    };

    createSignup = async (
        email, nickname, password, confirm, description
    ) => {
        const condition = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!condition.test(email)) {
            throw new ValidationError(
                'email을 형식이 일치하지 않습니다.', 412
            )
        };
        if (password !== confirm) {
            throw new ValidationError(
                'confirm을 확인해주세요.', 412
            )
        }

        return this.userRepository.createSignup(
            email,
            nickname,
            password,
            description
        );


    };

    checkUser = async (
        email, nickname
    ) => {
        await this.userRepository.checkEmail(email);
        await this.userRepository.checkNickname(nickname);
        return
    }
}

module.exports = UserService;
