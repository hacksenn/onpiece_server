const UserRepository = require('../repositories/user.repository');
const { InvalidParamsError } = require('../middleWares/exceptions/error.class')

class UserService {
    userRepository = new UserRepository();

    FindUser = async (userId) => {
        const user = await this.userRepository.FindOneUser(userId);
        if (user == null || user.length === 0) {
            throw new InvalidParamsError('유저를 찾을 수 없습니다.', 404);
        }
        return user;
      };

    UpdateUser = async (userId, description) => {
        const user = await this.userRepository.FindOneUser(
            userId
        );
        if (user == null || user.length === 0) {
            throw new InvalidParamsError('유저를 찾을 수 없습니다.', 404);
        }
        if (userId !== user.userId) {
            throw new InvalidParamsError('유저 권한이 없습니다.', 401);
        }
        return this.userRepository.UpdateUser(userId, description);
    };

    FindAllUserPosts = async (userId) => {
        const posts = await this.userRepository.FindAllUserPosts(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }
        return posts;
    };

    FindAllUserApply = async (userId) => {
        const posts = await this.userRepository.FindAllUserApply(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }
        return posts;
    };

}

module.exports = UserService;