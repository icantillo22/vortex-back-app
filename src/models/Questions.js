import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import Categories from './Categories'
import Users from './Users'

const Questions = sequelize.define('questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    question: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

Questions.belongsTo(Users, {as: 'UsersCreate', foreignKey: 'createdBy'})
Questions.belongsTo(Users, {as: 'UsersUpdate', foreignKey: 'updatedBy'})
Questions.belongsTo(Categories, {as: 'Categories', foreignKey: 'categoryId'})

export default Questions