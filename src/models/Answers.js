import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import Questions from './Questions'
import Users from './Users'

const Answers = sequelize.define('answers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    response: {
        type: DataTypes.TEXT,
    },
    qualification: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Questions,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
})

Answers.belongsTo(Questions, {as: 'Questions', foreignKey: 'questionId'})
Answers.belongsTo(Users, {as: 'UserCreate', foreignKey: 'createdBy'})
Answers.belongsTo(Users, {as: 'UsersUpdate', foreignKey: 'updatedBy'})

export default Answers