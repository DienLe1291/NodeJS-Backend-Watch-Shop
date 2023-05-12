import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import Cart from './cart.model';
import Watch from './watch.model';

const Cart_Watch = sequelize.define('Cart_Watch', {
    cartId: {
        type: DataTypes.BIGINT(11),
        references: {
            model: Cart,
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
    tableName: 'cart_watch'
});

Cart.belongsToMany(Watch, { through: Cart_Watch });
Watch.belongsToMany(Cart, { through: Cart_Watch });

export default Cart_Watch;
