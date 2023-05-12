import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './user.model';
import Watch from './watch.model';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT(11),
        references: {
            model: User,
            key: 'id'
        }
    },
    watchId: {
        type: DataTypes.BIGINT(11),
        references: {
            model: Watch,
            key: 'id'
        }
    }
}, {
    tableName: 'carts'
});

Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Cart;
