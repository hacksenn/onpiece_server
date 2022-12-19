const PostRepository = require('../repositories/post.repository');
const { ValidationError } = require('../middleWares/exceptions/error.class');
const { Users, Posts, Comments, Applicants } = require('../models');

class PostService {
    postRepository = new PostRepository(Posts, Users, Comments, Applicants);

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
        const createPost = await this.postRepository.createPost(
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
        );
        if (!createPost)
            throw ValidationError('게시글 작성에 실패하였습니다.', 400);
        return createPost;
    };

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
        if (!allPost)
            throw ValidationError('게시글 조회에 실패하였습니다.', 400);
        return allPost.map((post) => {
            return {
                postId: post.postId,
                userId: post.userId,
                nickname: post.User.nickname,
                title: post.title,
                content: post.content,
                category: post.category,
                level: post.level,
                headCount: post.headCount,
                recruitmentEndDay: post.recruitmentEndDay,
                startTime: post.startTime,
                endTime: post.endTime,
                startDay: post.startDay,
                endDay: post.endDay,
                applicants: post.Applicants.map((a) => {
                    return a.userId;
                }),
            };
        });
    };

    findPostById = async (postId) => {
        const findPost = await this.postRepository.findPostById(postId);

        if (!findPost)
            throw new ValidationError('게시글 조회에 실패하였습니다.', 400);
        return {
            postId: findPost.postId,
            userId: findPost.userId,
            nickname: findPost.User.nickname,
            userDescription: findPost.User.description,
            title: findPost.title,
            content: findPost.content,
            category: findPost.category,
            level: findPost.level,
            headCount: findPost.headCount,
            recruitmentEndDay: findPost.recruitmentEndDay,
            startTime: findPost.startTime,
            endTime: findPost.endTime,
            startDay: findPost.startDay,
            endDay: findPost.endDay,
            applicants: findPost.Applicants.map((a) => {
                return a.userId;
            }),
        };
    };

    findExPostsById = async (userId, postId) => {
        const findExPosts = await this.postRepository.findExPostsById(userId);

        if (!findExPosts) {
            return;
        }
        const posts = [];
        findExPosts.map((post) => {
            if (post.postId === Number(postId)) {
                return;
            } else {
                return posts.push(post);
            }
        });
        return posts;
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
        const findPost = await this.postRepository.findPostById(postId);
        if (!findPost) throw new ValidationError('존재하지 않는 게시글입니다.');

        const updatePost = await this.postRepository.updatePost(
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
        );
        if (!updatePost) {
            throw new ValidationError('게시글 수정에 실패하였습니다.');
        }
        return updatePost;
    };

    deletePost = async (userId, postId) => {
        const deletedPost = await this.postRepository.deletePost(
            userId,
            postId
        );

        if (!deletedPost)
            throw new ValidationError(
                '게시글이 정상적으로 삭제되지 않았습니다.'
            );

        return deletedPost;
    };

    findPost = async (postId) => {
        const existPost = await this.postRepository.findPost(postId);
        if (!existPost) {
            throw new ValidationError('존재하지 않는 게시물입니다.');
        }
        return existPost;
    };

    applyStudy = async (userId, postId) => {
        const appliedStudy = await this.postRepository.applyStudy(
            userId,
            postId
        );

        if (!appliedStudy) {
            throw new ValidationError(
                '스터디 신청이 정상적으로 완료되지 않았습니다.'
            );
        }
        return appliedStudy;
    };

    findAppliedStudy = async (userId) => {
        const existAppliedStudy = await this.postRepository.findAppliedStudy(
            userId
        );
        if (existAppliedStudy) {
            throw new ValidationError('스터디 신청이 이미 완료되었습니다.');
        } else {
            return;
        }
    };

    cancleStudyApply = async (userId, postId) => {
        const cancellationStudyApply =
            await this.postRepository.cancleStudyApply(userId, postId);
        if (!cancellationStudyApply) {
            throw new ValidationError('신청된 스터디가 없습니다.');
        }
        return cancellationStudyApply;
    };
}

module.exports = PostService;
