const { Users } = require('../models');
const { Posts } = require('../models');
const { Comments } = require('../models');

class CommentRepository {
    FindOnePost = async (postId) => {
        return Posts.findOne({
            where: {
                postId,
            },
            include: {
                model: Users,
                attributes: ['nickname'],
            },
        });
    };

    CommentFindOne = async (commentId) => {
        return Comments.findOne({
            where: { commentId },
        });
    };
}

module.exports = CommentRepository;
