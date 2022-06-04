import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import config from '../config'
import Questions from '../models/Questions'
import Answers from '../models/Answers'
import Users from '../models/Users'
import Categories from '../models/Categories'

const getQuestions = async (req, res) => {    
    try {
        const search = req.query?.search || ''
        const categories = req.query?.categories || null
        const userId = req.query?.userId || null

        const options = {
            include: [
                { model: Users, as: 'UsersCreate', attributes: [ 'username', 'name', 'id', 'rolId' ] },
                { model: Categories, as: 'Categories', attributes: [ 'category' ] },
            ],
            where: {
                question: {
                    [Op.iLike]: `%${search.trim()}%`
                }
            },
            order: [['createdAt', 'DESC']]
        }

        if (categories) {
            options.where['categoryId'] = {[Op.in]: JSON.parse(categories)}
        }

        if(userId) {
            options.where['createdBy'] = parseInt(userId)
        }

        const questions = await Questions.findAll(options)

        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({error: true, message: error.message})
    }
}

const getQuestionsById = async (req, res) => {
    try {
        const { id } = req.params

        const questions = await Questions.findOne({
            include: [
                { model: Users, as: 'UsersCreate', attributes: [ 'username', 'name', 'id', 'rolId' ] },
                { model: Categories, as: 'Categories', attributes: [ 'category' ] },
            ],
            where: { id }
        })
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({error: true, message: error.message})
    }
}

const getAnswers = async (req, res) => {
    const { id } = req.params
    try {
        const answers = await Answers.findAll({
            include: [
                { model: Users, as: 'UserCreate', attributes: [ 'username', 'name', 'id', 'rolId' ] },
                { model: Questions, as: 'Questions', attributes: [ 'createdBy' ] },
            ],
            where: {
                questionId: id
            },
            order: [
                ['qualification', 'DESC'],
            ]
        })

        return res.status(200).json(answers)
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

const createQuestion = async (req, res) => {
    try {
        const { question, description, categoryId } = req.body

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const newQuestion = await Questions.create({
            question, 
            description,
            categoryId,
            createdBy: decoded.id,
        })

        return res.status(200).json(newQuestion)
    } catch (error) {
        return res.status(200).json({error: true, message: error.message})
    }
}

const editQuestion = async (req, res) => {
    try {
        const { id } = req.params

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const question = await Questions.findOne({ where: { id, createdBy: decoded.id } })

        if (!question) {
            return res.status(400).json({error: true, message: 'No se puede realizar la acción, ya que, la pregunta no existe o no eres el creador de la misma'})
        }

        question.set(req.body)
        await question.save()

        return res.status(200).json(question)
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const question = await Questions.findOne({ where: { id, createdBy: decoded.id } })

        if (!question) return res.status(400).json({error: true, message: 'No se puede realizar la acción, ya que, la pregunta no existe o no eres el creador de la misma'})

        await Answers.destroy({
            where: {
                questionId: id
            }
        })

        await Questions.destroy({
            where: {id}
        })


        res.send({ message: 'Pregunta eliminada con éxito' })
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

export {
    getQuestions, getQuestionsById, getAnswers, createQuestion,
    editQuestion, deleteQuestion
}