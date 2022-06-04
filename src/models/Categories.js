import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

export default Categories