const { Op } = require('sequelize');

class PostRepository {
    constructor(PostsModel, UsersModel, CommentsModel, ApplicantsModel) {
        this.PostsModel = PostsModel;
        this.UsersModel = UsersModel;
        this.CommentsModel = CommentsModel;
        this.ApplicantsModel = ApplicantsModel;
    }

    createPost = async (
        userId,
        title,
        content,
        category,
        level,
        headCount,
        recruitmentEndDay,
        startTime,
        endTime,
        startDay,
        endDay
    ) => {
        console.log(userId)
        const createPost = await this.PostsModel.create({
            userId,
            title,
            content,
            category,
            level,
            headCount,
            recruitmentEndDay,
            startTime,
            endTime,
            startDay,
            endDay,
        });
        return createPost;
    };

    findAllPost = async () => {
        const allPost = await this.PostsModel.findAll({
            where: {
                recruitmentEndDay: {
                    [Op.gt]: Math.round(+new Date() / 1000),
                },
            },
            include: [
                {
                    model: this.UsersModel,
                    as: 'User',
                    attributes: ['nickname'],
                },
                {
                    model: this.ApplicantsModel,
                    as: 'Applicants',
                    attributes: ['userId'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        return allPost;
    };

    findPostById = async (postId) => {
        const findPost = await this.PostsModel.findOne({
            where: { postId },
            include: [
                {
                    model: this.UsersModel,
                    as: 'User',
                    attributes: ['nickname', 'description'],
                },
                {
                    model: this.ApplicantsModel,
                    as: 'Applicants',
                    attributes: ['userId'],
                },
            ],
        });
        return findPost;
    };

    findExPostsById = async (userId) => {
        const exPosts = await this.PostsModel.findAll({
            where: {
                userId,
            },
            attributes: ['postId', 'title'],
            order: [['createdAt', 'DESC']],
        });
        return exPosts;
    };

    findApplicants = async (postId) => {
        const findApplicants = await this.ApplicantsModel.findAll({
            where: {
                postId,
            },
            include: [
                {
                    model: this.UsersModel,
                    as: 'User',
                    attributes: ['userId', 'nickname', 'email', 'description'],
                },
            ],
        });
        return findApplicants;
    };

    updatePost = async (
        userId,
        postId,
        title,
        content,
        category,
        level,
        headCount,
        recruitmentEndDay,
        startTime,
        endTime,
        startDay,
        endDay
    ) => {
        const updatePost = await this.PostsModel.update(
            {
                title,
                content,
                category,
                level,
                headCount,
                recruitmentEndDay,
                startTime,
                endTime,
                startDay,
                endDay,
            },
            { where: { userId, postId } }
        );
        console.log(updatePost);
        return updatePost;
    };

    deletePost = async (userId, postId) => {
        const deletedPost = await this.PostsModel.destroy({
            where: { userId, postId },
        });

        return deletedPost;
    };

    findPost = async (postId) => {
        const existPost = await this.PostsModel.findOne({
            where: { postId },
        });

        return existPost;
    };

    applyStudy = async (userId, postId) => {
        const appliedStudy = await this.ApplicantsModel.create({
            userId,
            postId,
        });
        return appliedStudy;
    };

    findIsDoneStudy = async (postId) => {
        const findPost = await this.PostsModel.findOne({
            where: { postId },
            include: [
                {
                    model: this.ApplicantsModel,
                    as: 'Applicants',
                    attributes: ['userId'],
                },
            ],
        });
        return findPost;
    };

    findAppliedStudy = async (userId, postId) => {
        const existAppliedStudy = await this.ApplicantsModel.findOne({
            where: { userId, postId },
        });
        return existAppliedStudy;
    };

    cancleStudyApply = async (userId, postId) => {
        const cancellationStudyApply = await this.ApplicantsModel.destroy({
            where: { userId, postId },
        });
        return cancellationStudyApply;
    };
}

module.exports = PostRepository;
