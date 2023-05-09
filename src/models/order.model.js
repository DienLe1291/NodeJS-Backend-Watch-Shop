import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payMethod: {
        type: DataTypes.INTEGER
    },
    isPayment: {
        type: DataTypes.BOOLEAN
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: 'Order_Status',
            key: 'id'
        }
    }
}, {
    tableName: 'orders'
});

export default Order;
