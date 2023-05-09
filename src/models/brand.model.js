import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'brands'
});

export default Brand;
