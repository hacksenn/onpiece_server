const PostService = require('../services/post.service.js');
const { InvalidParamsError } = require('../middleWares/exceptions/error.class');

class PostController {
    postService = new PostService();

    // 게시글 작성
    createPost = async (req, res, next) => {
        try {
            const {
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
            } = req.body;

            if (
                !title ||
                !content ||
                !category ||
                !level ||
                !headCount ||
                !recruitmentEndDay ||
                !startTime ||
                !endTime ||
                !startDay ||
                !endDay
            ) {
                throw new InvalidParamsError();
            }

            const createPostData = await this.postService.createPost(
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
            res.status(201).json({ data: createPostData });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 조회
    getPosts = async (req, res, next) => {
        try {
            const posts = await this.postService.findAllPost();
            res.status(200).json({ data: posts });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 상세 조회
    getPostById = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const userId = 1;
            if (!postId) throw new InvalidParamsError();
            const post = await this.postService.findPostById(postId);

            const exPosts = await this.postService.findExPostsById(
                userId,
                postId
            );
            res.status(200).json({ post: post, exPosts: exPosts });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 수정
    updatePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const {
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
            } = req.body;
            const userId = 'mockId';
            if (
                !title ||
                !content ||
                !category ||
                !level ||
                !headCount ||
                !recruitmentEndDay ||
                !startTime ||
                !endTime ||
                !startDay ||
                !endDay
            ) {
                throw new InvalidParamsError();
            }

            const updatePost = await this.postService.updatePost(
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

            res.status(200).json({ data: updatePost });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 삭제
    deletePost = async (req, res, next) => {
        try {
            const userId = 'mockId';
            const { postId } = req.params;

            await this.postService.findPost(postId);

            const deletePost = await this.postService.deletePost(
                userId,
                postId
            );

            res.status(200).json({ data: deletePost });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PostController;
