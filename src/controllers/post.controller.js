const PostService = require('../services/post.service.js');
const { InvalidParamsError } = require('../middleWares/exceptions/error.class');
const { next } = require('cli');

class PostController {
    postService = new PostService();

    // 게시글 작성
    createPost = async (req, res, next) => {
        try {
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
            const userId = 1;
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

            const createdPost = await this.postService.createPost(
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
            res.status(201).json({ createdPost: createdPost });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 전체조회
    getPosts = async (req, res, next) => {
        try {
            const allPost = await this.postService.findAllPost();

            res.status(200).json({ allPost: allPost });
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

            const applicants = await this.postService.findApplicants(postId);
            res.status(200).json({
                post: post,
                exPosts: exPosts,
                applicants: applicants,
            });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 수정
    updatePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const userId = 1;
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

            const updatedPost = await this.postService.updatePost(
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
            res.status(200).json({ updatedPost: updatedPost });
        } catch (error) {
            next(error);
        }
    };

    // 게시글 삭제
    deletePost = async (req, res, next) => {
        try {
            const userId = 1;
            const { postId } = req.params;

            await this.postService.findPost(postId);

            const deletedPost = await this.postService.deletePost(
                userId,
                postId
            );

            res.status(200).json({ deletedPost: deletedPost });
        } catch (error) {
            next(error);
        }
    };

    // 스터디 신청
    applyStudy = async (req, res, next) => {
        try {
            const userId = 1;
            const { postId } = req.params;

            await this.postService.findIsDoneStudy(postId);

            await this.postService.findAppliedStudy(userId, postId);

            const appliedStudy = await this.postService.applyStudy(
                userId,
                postId
            );
            res.status(200).json({ appliedStudy: appliedStudy });
        } catch (error) {
            next(error);
        }
    };

    // 스터디 신청 취소
    cancleStudyApply = async (req, res, next) => {
        try {
            const userId = 1;
            const { postId } = req.params;

            const cancellationStudyApply =
                await this.postService.cancleStudyApply(userId, postId);
            res.status(200).json({
                cancellationStudyApply: cancellationStudyApply,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PostController;
