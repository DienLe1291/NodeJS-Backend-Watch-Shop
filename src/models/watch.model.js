import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Watch = sequelize.define('Watch', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    currentQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING
    },
    cloudinaryId: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Brand',
            key: 'id'
        }
    }
}, {
    tableName: 'watches'
});

export default Watch;
