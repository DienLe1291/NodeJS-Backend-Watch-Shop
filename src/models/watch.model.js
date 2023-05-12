import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import Comment from './comment.model';
import Brand from './brand.model';

const Watch = sequelize.define('Watch', {
    id: {
        type: DataTypes.BIGINT(11),
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
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references: {
            model: Brand,
            key: 'id'
        }
    }
}, {
    tableName: 'watches'
});

Watch.belongsTo(Brand, { foreignKey: 'brandId', as: 'brand' });
Watch.hasMany(Comment, { foreignKey: 'watchId', as: 'watch' });

export default Watch;
