import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    tableName: 'carts'
});

export default Cart;
