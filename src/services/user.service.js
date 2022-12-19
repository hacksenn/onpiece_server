const UserRepository = require('../repositories/user.repository');
const { InvalidParamsError } = require('../middleWares/exceptions/error.class');

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
        const user = await this.userRepository.FindOneUser(userId);
        if (user == null || user.length === 0) {
            throw new InvalidParamsError('유저를 찾을 수 없습니다.', 404);
        }
        if (Number(userId) !== user.userId) {
            throw new InvalidParamsError('유저 권한이 없습니다.', 401);
        }
        return this.userRepository.UpdateUser(userId, description);
    };

    FindAllUserPosts = async (userId) => {
        const posts = await this.userRepository.FindAllUserPosts(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }

        const postsApplicants = await Promise.all(
            posts.map(async (post) => {
                const postId = post.postId;
                const postApplicants = await this.userRepository.FindAllPostApply(postId);
                return {
                    postId: post.postId,
                    userId: post.userId,
                    nickname: post['User.nickname'],
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    level: post.level,
                    headCount: post.headCount,
                    recruitmentEndDay: post.recruitmentEndDay,
                    startTime: post.startTime,
                    endTime: post.endTime,
                    startDay: post.startDay,
                    endDay: post.endDay,
                    applicants: postApplicants,
                };
            })
        );
        return postsApplicants
    };

    FindAllUserApply = async (userId) => {
        const posts = await this.userRepository.FindAllUserApply(userId);
        if (posts == null || posts.length === 0) {
            throw new InvalidParamsError('포스트를 찾을 수 없습니다.', 404);
        }

        const postsApplicants = await Promise.all(
            posts.map(async (post) => {
                const postId = post.postId;
                const postApplicants = await this.userRepository.FindAllPostApply(postId);
                return {
                    postId: post.postId,
                    userId: post.userId,
                    nickname: post['User.nickname'],
                    title: post['Post.title'],
                    content: post['Post.content'],
                    category: post['Post.category'],
                    level: post['Post.level'],
                    headCount: post['Post.headCount'],
                    recruitmentEndDay: post['Post.recruitmentEndDay'],
                    startTime: post['Post.startTime'],
                    endTime: post['Post.endTime'],
                    startDay: post['Post.startDay'],
                    endDay: post['Post.endDay'],
                    applicants: postApplicants,
                };
            })
        );
        return postsApplicants
    };
}

module.exports = UserService;
