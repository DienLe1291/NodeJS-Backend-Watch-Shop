import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    },
    image: {
        type: DataTypes.STRING
    },
    cloudinaryId: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    watchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Watch',
            key: 'id'
        }
    }
}, {
    tableName: 'comments'
});

export default Comment;
