const CommentService = require('../services/comment.service');
const {ValidationError} = require('../middleWares/exceptions/error.class')

class CommentController {
    commentService = new CommentService();

    CreateComment = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals;
            const { comment } = req.body;

            if (!postId || !userId || !comment) {
                throw new ValidationError();
            }

            const commentId = await this.commentService.CreateComment(postId, userId, comment);
            res.status(200).json(commentId);
        } catch (error) {
            next(error);
        }
    };
    UpdateComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;
            const { userId } = res.locals;

            if (!comment) {
                throw new ValidationError('댓글을 작성 해주세요.', 412);
            }

            const updateComment = await this.commentService.UpdateComment(commentId, comment, userId);
            return res.status(200).json(updateComment);
        } catch (error) {
            next(error);
        }
    };
    DeleteComment = async (req, res, next) => {
      try {
        let { commentId } = req.params;
        const { userId } = res.locals;
        
        await this.commentService.DeleteComment(commentId, userId);
        return res.status(200).json({ message: "댓글을 삭제하였습니다." });
      } catch (error) {
        next(error);
      }
    };
    FindAllComment = async (req, res, next) => {
      try {
        const { postId } = req.params;
  
        const comments = await this.commentService.FindAllComment(postId);
        res.json({
          data: comments,
        });
      } catch (error) {
        next(error);
      }
    };
    FindOneComment = async (req, res, next) => {
      try {
        const { commentId } = req.params;
  
        const comments = await this.commentService.FindOneComment(commentId);
        res.json({
          data: comments,
        });
      } catch (error) {
        next(error);
      }
    };
}

module.exports = CommentController;
