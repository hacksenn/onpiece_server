const { Users } = require('../models');
const { Posts } = require('../models');
const { Comments } = require('../models');

class CommentRepository {
    CreateComment = async (postId, userId, comment) => {
        return Comments.create({ postId, userId, comment });
    };
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
    FindOneComment = async (commentId) => {
        return Comments.findOne({
            where: { commentId },
        });
    };
    UpdateComment = async (comment, commentId) => {
        return Comments.update({ comment }, { where: { commentId } });
    };
    DeleteComment = async (commentId) => {
        return Comments.destroy({ where: { commentId } });
    };
    FindAllComment = async (postId) => {
        return Comments.findAll({
            where: { postId },
            raw: true,
        });
    };
    FindOneComment = async (commentId) => {
      return Comments.findOne({
        where: { commentId },
      });
    };
}

module.exports = CommentRepository;
