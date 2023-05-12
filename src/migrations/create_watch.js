'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('watches', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            currentQuantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            image: {
                type: Sequelize.STRING
            },
            cloudinaryId: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            brandId: {
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
        await queryInterface.dropTable('watches');
    }
};