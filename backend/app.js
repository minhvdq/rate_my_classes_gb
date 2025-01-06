const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')
const classRouter = require('./controllers/class')
const userRouter = require('./controllers/user')
const reviewRouter = require('./controllers/review')
const loginRouter = require('./controllers/login')
const newUserRouter = require( './controllers/newuser')

const mongoose = require('mongoose')
const path = require('path');

mongoose.set('strictQuery', false)

logger.infor(`connecting to MongoDB`)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.infor(`connected to MongoDB`,config.MONGODB_URI)
}).catch(error => logger.infor(error.message))

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use('/PasswordReset', (req, res) => {
    res.sendFile(path.join(__dirname,'/ui_assets/index.html'))
} )

app.use('/PasswordResetRequest', (req, res) => {
    res.sendFile(path.join(__dirname,'/ui_assets/request.html'))
} )
app.use(middlewares.requestLogger)
app.use(middlewares.tokenExtractor)
app.use('/api/user', userRouter)
app.use('/api/review', reviewRouter)
app.use('/api/class', classRouter)
app.use('/api/login', loginRouter)
app.use('/api/newUser', newUserRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app