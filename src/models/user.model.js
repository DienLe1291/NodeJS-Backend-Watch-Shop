'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Address, { foreignKey: 'userId', as: 'userAddress' })
            User.hasMany(models.Cart, { foreignKey: 'userId', as: 'userCart' })
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'userOrder' })
            User.hasMany(models.Comment, { foreignKey: 'userId', as: 'userComment' })
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        fullName: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        image: DataTypes.STRING,
        cloudinaryId: DataTypes.STRING,
        roleId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};