const SignupRepository = require("../repositories/signup.repository");
const { ValidationError, ExistError } = require('../middleWares/exceptions/error.class');

class SignupService {
    signupRepository = new SignupRepository();


    createSignup = async (
        email, nickname, password, confirm, description
    ) => {
        console.log(email, nickname, password, confirm, description)
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

    checkUser = async ({
        email, nickname
    }) => {
        checkEmail(email); {
            const condition = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return condition.test(email);
        }
        console.log(condition.test(email));
        if (condition.test(email) === false) {
            throw new ValidationError(
                'email을 형식이 일치하지 않습니다.', 412
            )
        };

        const isExistUser = await this.findAllPost({ where: { email } });
        for (let a of isExistUser) {
            if (a.email === email) {
                throw new ExistError(
                    '중복된 email 입니다.', 412
                )
            }
            if (a.nickname === nickname) {
                throw new ExistError(
                    '중복된 nickname입니다.', 412
                )
            }
        };
    }
}

module.exports = SignupService;