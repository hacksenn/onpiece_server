require('dotenv').config();
const { Users } = require('../models');
const { Posts } = require('../models');
const { Applicants } = require('../models');
const { Op } = require('sequelize');
const crypto = require('crypto');
const { ExistError } = require('../middleWares/exceptions/error.class');

class UserRepository {
    FindPosts = async () => {
        return Posts.findAll({
            include: [
                {
                    model: Users,
                    as: 'User',
                    attributes: ['nickname'],
                },
                {
                    model: Applicants,
                    as: 'Applicants',
                    attributes: ['userId'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    };

    OldPosts = async () => {
        const posts = await Posts.findAll({
            raw: true,
            where: {
                recruitmentEndDay: {
                    [Op.lt]: Math.round(+new Date() / 1000),
                },
            },
        });
        return posts.length;
    };

    FindAllUser = async () => {
        return Users.findAll({
            raw: true,
            attributes: ['userId', 'email', 'nickname', 'description'],
        });
    };
    FindOneUser = async (userId) => {
        return Users.findOne({
            raw: true,
            where: { userId },
            attributes: ['userId', 'email', 'nickname', 'description'],
        });
    };
    UpdateUser = async (userId, description) => {
        return Users.update({ description }, { where: { userId } });
    };

    FindAllUserPosts = async (userId) => {
        const posts = await Posts.findAll({
            where: { userId },
            raw: true,
            attributes: [
                'postId',
                'userId',
                'title',
                'content',
                'category',
                'level',
                'headCount',
                'recruitmentEndDay',
                'startTime',
                'endTime',
                'startDay',
                'endDay',
            ],
            include: [
                {
                    model: Users,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });

        return posts;
    };

    FindAllPostApply = async (postId) => {
        const applicants = await Applicants.findAll({
            where: { postId },
            raw: true,
            attributes: ['userId'],
        });
        const postApplicants = [];
        for (let i = 0; i < applicants.length; i++) {
            postApplicants.push(applicants[i].userId);
        }
        return postApplicants;
    };

    FindAllUserApply = async (userId) => {
        return Applicants.findAll({
            where: { userId },
            raw: true,
            include: [
                {
                    model: Posts,
                },
                {
                    model: Users,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    };

    existUser = async (email, password) => {
        const User = await Users.findOne({
            raw: true,
            where: { [Op.and]: [{ email }, { password }] },
        });
        return User;
    };

    createSignup = async (email, nickname, password, description) => {
        const secretPW = crypto
            .createHash(process.env.PW_KEY)
            .update(password)
            .digest(process.env.INCOD);

        password = secretPW;

        return Users.create({ email, nickname, password, description });
    };

    checkEmail = async (email) => {
        // findAll로 찾은게 isExistUser의 길이가 0이면, 중복검사 통과
        // 길이가 1 이상이면, 중복으로 에러날림

        const isExistEmail = await Users.findAll({
            raw: true,
            where: { email },
        });
        if (isExistEmail.length > 0) {
            throw new ExistError('중복된 email 입니다.', 412);
        }
        return;
    };
    checkNickname = async (nickname) => {
        // findAll로 찾은게 isExistUser의 길이가 0이면, 중복검사 통과
        // 길이가 1 이상이면, 중복으로 에러날림

        const isExistNickname = await Users.findAll({
            raw: true,
            where: { nickname },
        });
        if (isExistNickname.length > 0) {
            throw new ExistError('중복된 nickname 입니다.', 412);
        }
        return;
    };
}

module.exports = UserRepository;
