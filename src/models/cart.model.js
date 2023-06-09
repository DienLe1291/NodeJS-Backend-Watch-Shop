'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cart.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
            Cart.belongsTo(models.Watch, { foreignKey: 'watchId', targetKey: 'id', as: 'watch' })
        }
    }
    Cart.init({
        quantity: DataTypes.INTEGER,
        userId: DataTypes.BIGINT(11),
        watchId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};