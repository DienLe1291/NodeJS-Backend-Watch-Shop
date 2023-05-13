'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT(11),
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            cloudinaryId: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            roleId: {
                type: Sequelize.INTEGER,
                defaultValue: 1, // 0: admin, 1: customer
                allowNull: false
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
        await queryInterface.dropTable('users');
    }
};