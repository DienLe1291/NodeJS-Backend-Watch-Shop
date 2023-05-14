'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Watch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Watch.hasMany(models.Detail, { foreignKey: 'watchId', as: 'watchDetail' })
            Watch.hasMany(models.Comment, { foreignKey: 'watchId', as: 'watchComment' })
            Watch.hasMany(models.Cart, { foreignKey: 'watchId', as: 'watchCart' })
            Watch.belongsTo(models.Brand, { foreignKey: 'brandId', targetKey: 'id', as: 'brand' })
        }
    }
    Watch.init({
        name: DataTypes.STRING,
        currentQuantity: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        image: DataTypes.STRING,
        cloudinaryId: DataTypes.STRING,
        description: DataTypes.TEXT,
        brandId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Watch',
    });
    return Watch;
};