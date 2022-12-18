
const { Users } = require('../models');
const { Posts } = require('../models');
const { Applicants } = require('../models');

class UserRepository {
    FindOneUser = async (userId) => {
        return Users.findOne({
            raw: true,
            where: { userId },
            attributes: ['userId', 'email', 'nickname','description'],
        });
    };
    UpdateUser = async (userId, description) => {
        return Users.update({ description }, { where: { userId } });
    };

    FindAllUserPosts = async (userId) => {
        const posts = await Posts.findAll({
            where: { userId },
            raw: true,
            attributes: [
                'postId',
                'userId',
                'title',
                'content',
                'category',
                'level',
                'headCount',
                'recruitmentEndDay',
                'startTime',
                'endTime',
                'startDay',
                'endDay',
            ],
            include: [
                {
                    model: Users,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });


        return posts;
    };

    FindAllPostApply = async (postId) => {
        const applicants = await Applicants.findAll({
            where: {postId},
            raw : true,
            attributes: [
                'userId'
            ],
        })
        const postApplicants = []
        for(let i = 0; i<applicants.length; i++){
            postApplicants.push(applicants[i].userId)
        }
        console.log("postApplicants : ", postApplicants)
        return postApplicants
    }

    FindAllUserApply = async (userId) => {
        return Applicants.findAll({
            where: { userId },
            raw: true,
            include: [
                {
                    model: Posts,
                },
                {
                    model: Users,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    };


}

module.exports = UserRepository;
