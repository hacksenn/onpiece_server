const { Users } = require('../models');
const { Op } = require('sequelize');

class LoginRepository {
    existUser = async (email, password) => {
        const User = await Users.findOne({
            raw: true,
            where: { [Op.and]: [{ email }, { password }] },
        });
        return User;
    }
}

module.exports = LoginRepository;