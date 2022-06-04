import jwt from 'jsonwebtoken'
import config from '../config'
import Answers from '../models/Answers'
import Questions from '../models/Questions'

const createAnswer = async (req, res) => {
    try {
        const { response, questionId } = req.body

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const newAnswer = await Answers.create({
            response, questionId, createdBy: decoded.id,
        })

        return res.status(200).json(newAnswer)
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

const gradeAnswer = async (req, res) => {
    try {
        const { id } = req.params
        const { qualification, questionId } = req.body
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const isCreatorQuestion = await Questions.findOne({ where: { id: questionId, createdBy: decoded.id } })

        if (!isCreatorQuestion) return res.status(404).json({error: true, message: 'Solo el usuario que creó la pregunta puede calificarlas'})

        const result = await Answers.update({qualification, updatedBy: decoded.id}, {
            where: { id, questionId }
        })

        if (!result[0]) return res.status(404).json({error: true, message: 'Error al realizar la calificación de la pregunta, intentelo mas tarde'})

        res.status(200).json({ message: 'Se ha guardado la calificación con éxito' })
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

const editAnswer = async (req, res) => {
    try {
        const { id } = req.params

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const answer = await Answers.findOne({ where: { id, createdBy: decoded.id } })        
        if (!answer) return res.status(404).json({error: true, message: 'No se puede realizar la acción, ya que, la respuesta no existe o no eres el creador de la misma'})        

        answer.set(req.body)
        await answer.save()

        return res.status(200).json(answer) 
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params

        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, config.SECRET)

        const answer = await Answers.findOne({ where: { id, createdBy: decoded.id } })        
        if (!answer) return res.status(404).json({error: true, message: 'No se puede realizar la acción, ya que, la respuesta no existe o no eres el creador de la misma'})        

        await Answers.destroy({ where: { id, createdBy: decoded.id } } )

        return res.status(200).json({ message: 'La respuesta se ha eliminado con éxito' })
    } catch (error) {
        res.status(500).json({error: true, message: error.message})    
    }
}

export {
    createAnswer, gradeAnswer, 
    editAnswer, deleteAnswer
}