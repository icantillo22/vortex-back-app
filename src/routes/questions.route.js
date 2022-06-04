import { Router } from "express";
import * as questionController from '../controllers/questions.constroller'
import * as middlewares from '../middlewares/index'

const router = Router();

router.get('/questions', questionController.getQuestions)
router.get('/questions/:id', questionController.getQuestionsById)
router.get('/questions/:id/answers', questionController.getAnswers)
router.post('/questions', [middlewares.verifyToken, middlewares.validations.questions.create], questionController.createQuestion)
router.put('/questions/:id', [middlewares.verifyToken, middlewares.validations.questions.update], questionController.editQuestion)
router.delete('/questions/:id', middlewares.verifyToken, questionController.deleteQuestion)

export default router