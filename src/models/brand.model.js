import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import Watch from './watch.model';

const Brand = sequelize.define('Brand', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    cloudinaryId: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'brands'
});

Brand.hasMany(Watch, { foreignKey: 'brandId', as: 'brand' });

export default Brand;
