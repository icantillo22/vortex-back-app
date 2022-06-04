import { Router } from "express";
import * as categoriesController from '../controllers/categories.controller'

const router = Router();

router.get('/categories', categoriesController.getCategories)

export default router