import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import Address from './address.model';
import Comment from './comment.model';
import Order from './order.model';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    cloudinaryId: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // 0: admin, 1: customer
        allowNull: false
    }
}, {
    tableName: 'users'
});

User.hasMany(Address, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'user' });
User.hasMany(Order, { foreignKey: 'userId', as: 'user' });

export default User;
