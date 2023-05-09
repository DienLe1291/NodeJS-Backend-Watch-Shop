import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Order_Status = sequelize.define('Order_Status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'order_status'
});

export default Order_Status;
