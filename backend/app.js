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
const authRouter = require('./controllers/auth.router')
const newUserRouter = require( './controllers/newuser')

const mongoose = require('mongoose')
const path = require('path');
const professorRouter = require('./controllers/professor')

mongoose.set('strictQuery', false)

logger.infor(`connecting to MongoDB`)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.infor(`connected to MongoDB`,config.MONGODB_URI)
}).catch(error => logger.infor(error.message))


// TO-DO: restricted the database access to certain origins, secure data
// const allowedOrigins = ["0.0.0.0"]

const allowedOrigins = [
    'http://0.0.0.0:5173',     // main frontend domain
    'http://localhost:5173' // optional admin subdomain
];

const corsOptions = {
origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    } else {
    callback(new Error('Not allowed by CORS'));
    }
},
methods: ['GET', 'POST', 'PUT', 'DELETE'], // restrict methods
credentials: true, // allow cookies if needed
optionsSuccessStatus: 204
};

// Apply CORS only to API routes
app.use('/api', cors(corsOptions));


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
app.use('/api/auth', authRouter)
app.use('/api/professor', professorRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app