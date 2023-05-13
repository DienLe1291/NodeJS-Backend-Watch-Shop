'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('addresses', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(11)
            },
            province: {
                type: Sequelize.STRING,
                allowNull: false
            },
            district: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ward: {
                type: Sequelize.STRING,
                allowNull: false
            },
            detail: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            isDefault: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            userId: {
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
        await queryInterface.dropTable('addresses');
    }
};