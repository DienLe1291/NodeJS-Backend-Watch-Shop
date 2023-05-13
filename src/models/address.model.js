'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Address.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
        }
    }
    Address.init({
        province: DataTypes.STRING,
        district: DataTypes.STRING,
        ward: DataTypes.STRING,
        detail: DataTypes.TEXT,
        isDefault: DataTypes.BOOLEAN,
        userId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};