const CommentService = require('../services/comment.service');
const {ValidationError} = require('../middleWares/exceptions/error.class')

class CommentController {
    commentService = new CommentService();

    CreateComment = async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const { comment } = req.body;

            if (!postId || userId || !comment) {
                throw new ValidationError();
            }

            await this.commentService.CreateComment(postId, userId, comment);
            res.status(200).json({ message: '댓글을 생성하였습니다.' });
        } catch (error) {
            next(error);
        }
    };
    UpdateComment = async (req, res) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;
            const { userId } = res.locals.user;

            if (!comment) {
                throw new ValidationError('댓글을 작성 해주세요.', 412);
            }

            await this.commentService.UpdateComment(commentId, comment, userId);
            return res.status(200).json({ msg: '댓글을 수정하였습니다.' });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CommentController;
