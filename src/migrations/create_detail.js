'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('details', {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(11)
            },
            quantity:{ 
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            watchId: {
                type: DataTypes.BIGINT(11),
                allowNull: false
            },
            orderId: {
                type: DataTypes.BIGINT(11),
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
        await queryInterface.dropTable('details');
    }
};