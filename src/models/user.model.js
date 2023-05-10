import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
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

export default User;
