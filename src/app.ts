import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import googleAuthRouter from './routers/googleAuthRouter'
import movieRouter from './routers/movie'
import userRouter from './routers/userRouter'
import adminRouter from './routers/adminRouter'
import phonesRouter from './routers/phoneRouter'
import reviewRouter from './routers/reviewRouter'
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
app.use(cookieParser())
app.use(passport.initialize())

//passport strategies
passport.use(googleStrategy)

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/googlelogin', googleAuthRouter)
app.use('/api/v1/phones', phonesRouter)
app.use('/api/v1/reviews', reviewRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
