import { Router } from "express";
import * as authController from '../controllers/auth.controller'
import * as middlewares from '../middlewares/index'

const router = Router();

router.post('/auth/signin', middlewares.validations.auth.signIn, authController.signIn)
router.post('/auth/signup', [middlewares.validations.auth.signUp, middlewares.verifySignup.checkDuplicateUsername], authController.signUp)

export default router