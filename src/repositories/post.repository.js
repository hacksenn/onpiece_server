class PostRepository {
    constructor(PostsModel, UsersModel, CommentsModel) {
        this.PostsModel = PostsModel;
        this.UsersModel = UsersModel;
        this.CommentsModel = CommentsModel;
    }

    createPost = async (
        userId,
        title,
        content,
        category,
        level,
        headCount,
        recruitmentEndDay,
        startTime,
        endTime,
        startDay,
        endDay
    ) => {
        const createPostData = await this.PostsModel.create({
            userId,
            title,
            content,
            category,
            level,
            headCount,
            recruitmentEndDay,
            startTime,
            endTime,
            startDay,
            endDay,
        });
        return createPostData;
    };

    findAllPost = async () => {
        const data = await this.PostsModel.findAll({
            include: [{ model: this.UsersModel, attributes: ['nickname'] }],
            // 내림차순 정렬
            order: [['createdAt', 'DESC']],
        });
        return data;
    };

    findPostById = async (postId) => {
        const post = await this.PostsModel.findOne({
            where: { postId },
            include: [
                { model: this.UsersModel, attributes: ['nickname'] },
                {
                    model: this.UsersModel,
                    attributes: ['nickname'],
                },
            ],
        });
        return post;
    };

    findExPostsById = async (userId) => {
        const exPosts = await this.PostsModel.findAll({
            raw: true,
            where: {
                userId,
            },
            attributes: ['postId', 'title'],
            order: [['createdAt', 'DESC']],
        });
        return exPosts;
    };

    updatePost = async (userId, postId, title, content) => {
        const result = await this.PostsModel.update(
            { title, content },
            { where: { postId: postId, userId: userId } }
        );
        return result;
    };

    deletePost = async (userId, postId) => {
        const deletedPost = await this.PostsModel.destroy({
            where: { userId, postId },
        });

        return deletedPost;
    };

    findPost = async (postId) => {
        const existPost = await this.PostsModel.findOne({
            where: { postId },
        });

        return existPost;
    };
}

module.exports = PostRepository;
