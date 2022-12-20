const LoginService = require('../services/login.service');
const { ExistError } = require('../middleWares/exceptions/error.class');

require('dotenv').config({ path: '../.env' });

let tokenObject = {}

class LoginController {
    loginService = new LoginService();

    Login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ExistError(
                    '이메일 혹은 패스워드를 다시 입력해주세요', 404
                )
            }
            const existUser = await this.loginService.existUser(email, password);
            console.log(existUser)

            const accessToken = this.loginService.createAcessToken(existUser.userId);
            console.log(accessToken)

            return res.header('token', accessToken).status(200).json({ token: accessToken });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = LoginController