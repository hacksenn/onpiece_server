const { Users } = require("../models");

class signupRepository {
    constructor() { }

    findAllPost = async ({ }) => {
        const Signup = await Users.findAll({});
        return Signup;
    };

    createSignup = async ({
        email, nickname, password, description
    }) => {
        const signup = await Users.create({
            email,
            nickname,
            password,
            description
        });

        return signup;
    };
}
module.exports = signupRepository;

