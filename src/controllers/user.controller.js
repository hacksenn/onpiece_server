const UserService = require('../services/user.service');
const { ValidationError } = require('../middleWares/exceptions/error.class');

class UserController {
    userService = new UserService();

    GetUser = async (req, res, next) => {
        try {
            //   const { userId } = req.params;
            const userId = 1;

            const user = await this.userService.FindUser(userId);
            res.json({
                data: user,
            });
        } catch (error) {
            next(error);
        }
    };

    UpdateUser = async (req, res, next) => {
        try {
            // const { userId } = req.params;
            const { description } = req.body;
            const userId = 1;

            if (!userId) {
                throw new ValidationError('유저 권한이 없습니다.', 401);
            }
            if (!description) {
                throw new ValidationError('소개글을 작성 해주세요.', 412);
            }

            await this.userService.UpdateUser(userId, description);
            return res.status(200).json({ msg: '소개글을 수정하였습니다.' });
        } catch (error) {
            next(error);
        }
    };

    FindAllUserPosts = async (req, res, next) => {
        try {
            //   const { userId } = req.params;
            const userId = 1;

            const posts = await this.userService.FindAllUserPosts(userId);
            res.json({
                data: posts,
            });
        } catch (error) {
            next(error);
        }
    };

    FindAllUserApply = async (req, res, next) => {
        try {
            //   const { userId } = req.params;
            const userId = 1;

            const posts = await this.userService.FindAllUserApply(userId);
            res.json({
                data: posts,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = UserController;
