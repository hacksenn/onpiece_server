const SignupRepository = require("../repositories/signup.repository");
const { ValidationError, ExistError } = require('../middleWares/exceptions/error.class');

class SignupService {
    signupRepository = new SignupRepository();


    createSignup = async (
        email, nickname, password, confirm, description
    ) => {
        console.log(email, nickname, password, confirm, description)

        const condition = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        console.log(condition.test(email));
        if (!condition.test(email)) {
            throw new ValidationError(
                'email을 형식이 일치하지 않습니다.', 412
            )
        };

        if (password !== confirm) {
            throw new ValidationError(
                'confirm을 확인해주세요.', 412
            )
        }

        return this.signupRepository.createSignup(
            email,
            nickname,
            password,
            description
        );


    };

    checkUser = async (
        email, nickname
    ) => {
        await this.signupRepository.checkEmail(email);
        await this.signupRepository.checkNickname(nickname);
        return
    }
}

module.exports = SignupService;