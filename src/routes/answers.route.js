import { Router } from "express";
import * as answersController from '../controllers/answers.controller'
import * as middlewares from '../middlewares/index'

const router = Router();

router.post('/answers', [middlewares.verifyToken, middlewares.validations.answers.create], answersController.createAnswer)
router.put('/answers/:id/qualify', [middlewares.verifyToken, middlewares.validations.answers.qualification], answersController.gradeAnswer)
router.put('/answers/:id', [middlewares.verifyToken, middlewares.validations.answers.update], answersController.editAnswer)
router.delete('/answers/:id', middlewares.verifyToken, answersController.deleteAnswer)

export default router