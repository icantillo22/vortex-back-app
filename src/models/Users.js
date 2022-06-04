import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import Roles from './Roles'

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    rolId: {
        type: DataTypes.INTEGER,
        references: {
            model: Roles,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

Users.belongsTo(Roles, {as: 'Roles', foreignKey: 'rolId'})

export default Users