'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comments', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(11)
            },
            content: {
                type: Sequelize.TEXT
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 5
            },
            image: {
                type: Sequelize.STRING
            },
            cloudinaryId: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.BIGINT(11)
            },
            watchId: {
                type: Sequelize.BIGINT(11)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('comments');
    }
};