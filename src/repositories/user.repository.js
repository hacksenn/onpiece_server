const { Users } = require('../models');
const { Posts } = require('../models');
const { Applicants } = require('../models');

class UserRepository {
    FindOneUser = async (userId) => {
        return Users.findOne({
            where: { userId },
            attributes: ['userId', 'email', 'nickname'],
        });
    };
    UpdateUser = async (userId, description) => {
        return Users.update({ description }, { where: { userId } });
    };

    FindAllUserPosts = async (userId) => {
        return Posts.findAll({
            where: { userId },
            raw: true,
            order: [['createdAt', 'DESC']],
        });
    };

    FindAllUserApply = async (userId) => {
        return Applicants.findAll({
            where: { userId },
            raw: true,
            include:[{
                model:Posts,
            }],
            order: [['createdAt', 'DESC']],
        });
    };
}

module.exports = UserRepository;
