const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    commentRepository = new CommentRepository();

    CreateComment = async (postId, userId, comment) => {
        const post = await this.postRepository.FindOnePost(postId);
        if (post == null || post.length === 0) {
            throw new InvalidParamsError('게시글을 찾을 수 없습니다.', 404);
        }
        return this.commentRepository.CreateComment(postId, userId, comment);
    };

    UpdateComment = async (commentId, comment, userId) => {
        const changeComment = await this.commentRepository.CommentFindOne(
            commentId
        );
        if (changeComment == null || changeComment.length === 0) {
            throw 'IsComment';
        }
        if (userId !== changeComment.userId) {
            throw 'PostingDataError';
        }
        return this.commentRepository.UpdateComment(comment, commentId);
    };
}

module.exports = CommentService;
