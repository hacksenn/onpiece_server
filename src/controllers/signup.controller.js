const SignupService = require("../services/signup.service");

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

}

module.exports = SignupController;
