const { next } = require("cli");
const CommentService = require("../service/comment.service");

class CommentController {
    commentService = new CommentService();

    CreateComment = async (req, res) => {
        try {
          let { postId } = req.params;
          const { userId } = res.locals.user;
          const { comment } = req.body;
    
          await this.commentService.CreateComment(postId, userId, comment);
          res.status(200).json({ message: "댓글을 생성하였습니다." });
        } catch (error) {
          next(error)
        }
      };

    
}

module.exports = CommentController;