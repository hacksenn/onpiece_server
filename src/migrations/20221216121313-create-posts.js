'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            userId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'userId',
                },
                allowNull: false,
                onDelete: 'cascade',
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                onDelete: 'cascade',
            },
            level: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: '초급',
            },
            headCount: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            category: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            recruitmentEndDay: {
                type: Sequelize.DataTypes.BIGINT,
                allowNull: false,
            },
            startTime: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 1,
            },
            endTime: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 1,
            },
            startDay: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 1,
            },
            endDay: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                defaultValue: 1,
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.NOW,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.NOW,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    },
};
