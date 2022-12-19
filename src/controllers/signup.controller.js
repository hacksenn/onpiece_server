const SignupService = require("../services/signup.service");
const url = require("url");

class SignupController {
    signupService = new SignupService();


    /**
     * @param {import("express").Request} req - express Request
     * @param {import("express").Response} res - express Response
     * @param {import("express").NextFunction} next - express Response
     * **/

    createSignup = async (req, res) => {
        try {
            const { email, nickname, password, confirm, description } = req.body;

            await this.signupService.createSignup(
                email,
                nickname,
                password,
                confirm,
                description
            );

            console.log(`${nickname} 님이 가입하셨습니다.`);
            res.status(201).send({ message: "회원 가입에 성공하였습니다." });
        } catch (error) {
            console.log(error);
            res.status(error.status || 400);
            res.json({ errorMessage: error.message });
        }
    };

    checkUser = async (req, res) => {
        try {
            const queryData = url.parse(req.url, true).query;

            const email = queryData.email
            const nickname = queryData.nickname
            console.log(email, nickname);

            await this.signupService.checkUser(
                email,
                nickname
            );
            res.status(200).json({ msg: '중복검사가 완료되었습니다.' })
        } catch (error) {
            res.status(error.status || 412);
            res.json({ errorMessage: error.message });
        }
    }

}

module.exports = SignupController;
