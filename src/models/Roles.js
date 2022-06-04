import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const Roles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rol: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

export default Roles