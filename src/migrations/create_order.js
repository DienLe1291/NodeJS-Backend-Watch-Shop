'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            totalAmount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            payMethod: {
                type: Sequelize.INTEGER
            },
            isPayment: {
                type: Sequelize.BOOLEAN
            },
            userId: {
                type: Sequelize.BIGINT(11)
            },
            statusId: {
                type: Sequelize.BIGINT(11),
                defaultValue: 1
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
        await queryInterface.dropTable('orders');
    }
};