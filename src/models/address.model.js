import { DataTypes, Deferrable } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './user.model';

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ward: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.BIGINT(11),
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'addresses'
});

Address.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Address.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

export default Address;
