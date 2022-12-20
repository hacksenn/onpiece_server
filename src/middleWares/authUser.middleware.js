const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const { tokenObject } = require('../controllers/login.controller')


module.exports = async (req, res, next) => {
    try {
        // 토큰이 없을 경우
        if (!req.cookies.accessToken) {
            console.log("accessToken이 없습니다.")
            throw next(err)
        }

        const accessToken = req.cookies.accessToken;
        // validateAccessToken() = 엑세스 토큰 확인
        const isAccessTokenValidate = validateAccessToken(accessToken);


        // AccessToken을 확인 했을 때 만료일 경우
        if (!isAccessTokenValidate) {
            const accessTokenId = tokenObject[refreshToken];
            const newAccessToken = createAccessToken(accessTokenId);

            res.cookie("accessToken", newAccessToken);
        }

        const { userId } = getAccessTokenPayload(accessToken);
        const user = await Users.findOne({
            raw: true,
            attributes: ["userId", "nickname"],
            where: { userId }
        })
        res.locals.user = user;



        next();
    } catch (err) {
        return res.status(400).json({ msg: "로그인이 필요합니다." });
    }
};

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
    try {
        jwt.verify(accessToken, process.env.KEY); // JWT를 검증합니다.
        return true;
    } catch (error) {
        return false;
    }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
    try {
        const payload = jwt.verify(accessToken, process.env.KEY); // JWT에서 Payload를 가져옵니다.
        return payload;
    } catch (error) {
        return null;
    }
}

function createAccessToken(userId) {
    const accessToken = jwt.sign(
        { userId },
        process.env.KEY, // 시크릿 키
        { expiresIn: "10m" } // 유효 시간
    );

    return accessToken;
}