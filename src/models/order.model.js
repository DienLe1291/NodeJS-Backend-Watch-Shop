'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.hasMany(models.Detail, { foreignKey: 'orderId', as: 'order' })
            Order.belongsTo(models.Status, { foreignKey: 'statusId', targetKey: 'id', as: 'status' })
            Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
        }
    }
    Order.init({
        date: DataTypes.DATE,
        totalAmount: DataTypes.INTEGER,
        payMethod: DataTypes.INTEGER,
        isPayment: DataTypes.BOOLEAN,
        province: DataTypes.STRING,
        district: DataTypes.STRING,
        ward: DataTypes.STRING,
        detail: DataTypes.TEXT,
        userId: DataTypes.BIGINT(11),
        statusId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};