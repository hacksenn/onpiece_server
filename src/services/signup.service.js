const signupRepository = require("../repositories/signup.repository");
// const { ValidationError, ExistError } = require('../exceptions/index.exception');
class signupService {
    constructor() {
        this.signupRepository = new signupRepository();
    }

    findAllPost = async () => {
        const Signup = await this.signupRepository.findAllPost({});
        return Signup;
    };

    createSignup = async ({
        email, nickname, password, confirm
    }) => {
        function verifyEmail(email) {
            const condition = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

            return condition.test(email);
        }
        console.log(verifyEmail(email));
        if (verifyEmail(email) === false) {
            throw new ValidationError(
                'email을 확인해주세요.'
            )
        };

        function verifyPassword(password) {
            const condition = /^[a-zA-Z0-9]{4,30}$/;
            return condition.test(password);
        }
        if (verifyPassword(password) === false) {
            throw new ValidationError(
                'password를 확인해주세요.', 401
            )
        }

        if (password !== confirm) {
            throw new ValidationError(
                'confirm을 확인해주세요.'
            )
        }

        // function isRegexValidation(target, regex) {
        //     return target.search(regex) !== -1;
        // }
        // if (isRegexValidation(password, email)) {
        //     throw new ValidationError(
        //         '패스워드에 loginId이 포함되어 있습니다.'
        //     )
        // }

        const isExistUser = await this.findAllPost({ where: { email } });
        for (let a of isExistUser) {
            if (a.email === email) {
                throw new ExistError(
                    '중복된 email 입니다.'
                )
            }
            if (a.nickname === nickname) {
                throw new ExistError(
                    '중복된 nickname입니다.'
                )
            }
        }

        const signup =
            await this.signupRepository.createSignup({
                email,
                nickname,
                password
            });
        return signup;
    };
}

module.exports = signupService;