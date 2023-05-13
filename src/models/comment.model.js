'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' })
            Comment.belongsTo(models.Watch, { foreignKey: 'watchId', targetKey: 'id', as: 'watch' })
        }
    }
    Comment.init({
        content: DataTypes.TEXT,
        rate: DataTypes.INTEGER,
        image: DataTypes.STRING,
        cloudinaryId: DataTypes.STRING,
        userId: DataTypes.BIGINT(11),
        watchId: DataTypes.BIGINT(11)
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};