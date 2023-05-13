'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Detail.belongsTo(models.Watch, { foreignKey: 'watchId', targetKey: 'id', as: 'watch' })
            Detail.belongsTo(models.Order, { foreignKey: 'orderId', targetKey: 'id', as: 'order' })
        }
    }
    Detail.init({
        quantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        watchId: DataTypes.BIGINT(11),
        orderId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Detail',
    });
    return Detail;
};