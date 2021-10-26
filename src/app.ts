import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import googleAuthRouter from './routers/googleAuthRouter'
import movieRouter from './routers/movie'
import userRouter from './routers/user'
import phonesRouter from './routers/phone'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import compression from 'compression'
import { googleStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(compression())
app.use(express.json())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use(cors())
app.use(passport.initialize())

//passport strategies
passport.use(googleStrategy)

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/googlelogin', googleAuthRouter)
app.use('/api/v1/phones', phonesRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
