const CommentRepository = require('../repositories/comment.repository');
const { InvalidParamsError } = require('../middleWares/exceptions/error.class')

class CommentService {
    commentRepository = new CommentRepository();

    CreateComment = async (postId, userId, comment) => {
        const post = await this.commentRepository.FindOnePost(postId);
        if (post == null || post.length === 0) {
            throw new InvalidParamsError('게시글을 찾을 수 없습니다.', 404);
        }
        return this.commentRepository.CreateComment(postId, userId, comment);
    };
    UpdateComment = async (commentId, comment, userId) => {
        const changeComment = await this.commentRepository.FindOneComment(
            commentId
        );
        if (changeComment == null || changeComment.length === 0) {
            throw new InvalidParamsError('댓글을 찾을 수 없습니다.', 404);
        }
        if (userId !== changeComment.userId) {
            throw new InvalidParamsError('유저 권한이 없습니다.', 401);
        }
        return this.commentRepository.UpdateComment(comment, commentId);
    };
    DeleteComment = async (commentId, userId) => {
        const delComment = await this.commentRepository.FindOneComment(
            commentId
        );
        if (delComment == null || delComment.length === 0) {
            throw new InvalidParamsError('댓글을 찾을 수 없습니다.', 404);
        }
        if (delComment.userId !== userId || userId == undefined) {
            throw new InvalidParamsError('유저 권한이 없습니다.', 401);
        }
        return this.commentRepository.DeleteComment(commentId);
    };
    FindAllComment = async (postId) => {
        const comments = await this.commentRepository.FindAllComment(postId);
        if (comments == null || comments.length === 0) {
            throw new InvalidParamsError('댓글을 찾을 수 없습니다.', 404);
        }
        return comments;
    };
}

module.exports = CommentService;
