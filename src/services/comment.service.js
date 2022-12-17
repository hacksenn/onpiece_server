const CommentRepository = require("../repositories/comment.repository");

class CommentService {
    commentRepository = new CommentRepository();

    CreateComment = async (postId, userId, comment) => {
        const post = await this.postRepository.FindPostOne(postId);
        if (post == null || post.length === 0 || !userId) {
          throw "PostingDataError";
        }
        if (!comment) {
          throw "ExistComment";
        }
        return this.commentRepository.CreateComment(postId, userId, comment);
      };

}

module.exports = CommentService;