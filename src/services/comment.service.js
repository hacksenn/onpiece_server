const CommentRepository = require('../repositories/comment.repository');

class CommentService {
    commentRepository = new CommentRepository();

    findOneUser = async (userId) => {
        const user = await this.commentRepository.findOneUser(userId);
        if (!user || user.length === 0) {
            throw new ValidationError('유저 정보를 찾을 수 없습니다.', 412);
        }
    };
}

module.exports = CommentService;
