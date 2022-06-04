import express from "express"
import cors from "cors";
import morgan from "morgan"
import config from "./config";
import * as routes from './importRoutes'

const app = express()

const corsOptions = { origin: '*' };

// Middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/', routes.authRoute)
app.use('/api/', routes.categoriesRoute)
app.use('/api/', routes.questionsRoute)
app.use('/api/', routes.answersRoute)

app.set('port', config.PORT)

export default app