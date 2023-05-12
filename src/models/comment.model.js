import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './user.model';
import Watch from './watch.model';

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.BIGINT(11),
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
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    watchId: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: Watch,
            key: 'id'
        }
    }
}, {
    tableName: 'comments'
});

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Comment.belongsTo(Watch, { foreignKey: 'watchId', as: 'watch' });

export default Comment;
