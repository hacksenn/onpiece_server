const { Users } = require("../models");
const { Op } = require("sequelize");

class SignupRepository {
  createSignup = async (email, nickname, password, description) => {
    console.log(email, nickname, password, description)
    return Users.create({ email, nickname, password, description });
  };


  checkUser = async ({
    email,
    nickname,
  }) => {
    const User = await User.checkUser({
      where: { [Op.and]: [{ email }, { nickname }] },
    });
    return User;
  };
}

module.exports = SignupRepository;