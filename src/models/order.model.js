import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './user.model';
import Order_Status from './order_status.model';

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.BIGINT(11),
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
        type: DataTypes.BIGINT(11),
        references: {
            model: User,
            key: 'id'
        }
    },
    statusId: {
        type: DataTypes.BIGINT(11),
        defaultValue: 1,
        references: {
            model: Order_Status,
            key: 'id'
        }
    }
}, {
    tableName: 'orders'
});

Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(Order_Status, { foreignKey: 'statusId', as: 'order_status' });

export default Order;
