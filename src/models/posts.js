'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'postId',
      });
      this.hasMany(models.Applicants, {
        as: 'Applicants',
        foreignKey: 'postId',
      });
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Categories, { foreignKey: 'categoryId' });
    }
  }
  Posts.init(
    {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        allowNull: false,
        onDelete: 'cascade',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        onDelete: 'cascade',
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '초급',
      },
      headCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recruitmentEndDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
      },
      EndTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1,
      },
      StartDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      EndDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Posts',
    }
  );
  return Posts;
};
