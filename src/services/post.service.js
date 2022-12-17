const PostRepository = require('../repositories/post.repository');
const { ValidationError } = require('../middleWares/exceptions/error.class');
const { Users, Posts, Comments } = require('../models');

class PostService {
    postRepository = new PostRepository(Posts, Users, Comments);

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
        const createPostData = await this.postRepository.createPost(
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
        if (!createPostData)
            throw ValidationError('게시글 작성에 실패하였습니다.', 400);
        return createPostData;
    };

    findAllPost = async () => {
        const allPost = await this.postRepository.findAllPost();
        if (!allPost)
            throw ValidationError('게시글 조회에 실패하였습니다.', 400);

        allPost.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return allPost.map((post) => {
            return {
                postId: post.postId,
                userId: post.userId,
                nickname: post.nickname,
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
                applicants: post.applicants,
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
            nickname: findPost.nickname,
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
            applicants: findPost.applicants,
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
        if (!updatePost)
            throw new ValidationError('게시글 수정에 실패하였습니다.');
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
}

module.exports = PostService;
