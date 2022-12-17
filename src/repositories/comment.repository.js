const { Users } = require("../models");
const { Posts } = require("../models");

class CommentRepository {
    findOneUser = async (userId) => {
        return Users.findOne({
            where: {
                userId
            },
            raw : true
        })
    }
}

module.exports = CommentRepository;