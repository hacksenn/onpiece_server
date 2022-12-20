require("dotenv").config();
const { Users } = require("../models");
const { Op } = require("sequelize");
const crypto = require("crypto");
const { ExistError } = require("../middleWares/exceptions/error.class");


class SignupRepository {
  createSignup = async (email, nickname, password, description) => {
    console.log(email, nickname, password, description)

    const secretPW = crypto
      .createHash(process.env.PW_KEY)
      .update(password)
      .digest(process.env.INCOD);
    console.log(process.env.INCOD)
    console.log(secretPW)

    password = secretPW;

    return Users.create({ email, nickname, password, description });
  };

  checkEmail = async (email) => {
    // findAll로 찾은게 isExistUser의 길이가 0이면, 중복검사 통과 
    // 길이가 1 이상이면, 중복으로 에러날림

    const isExistEmail = await Users.findAll({
      raw: true,
      where: { email },
    });
    if (isExistEmail.length > 0) {
      throw new ExistError(
        '중복된 email 입니다.', 412
      )
    }
    return
  }
  checkNickname = async (nickname) => {
    // findAll로 찾은게 isExistUser의 길이가 0이면, 중복검사 통과 
    // 길이가 1 이상이면, 중복으로 에러날림

    const isExistNickname = await Users.findAll({
      raw: true,
      where: { nickname },
    });
    if (isExistNickname.length > 0) {
      throw new ExistError(
        '중복된 nickname 입니다.', 412
      )
    };
    return
  }
}


module.exports = SignupRepository;