import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import Order from './order.model';

const Order_Status = sequelize.define('Order_Status', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'order_status'
});

Order_Status.hasMany(Order, { foreignKey: 'statusId', as: 'order_status' });

export default Order_Status;
