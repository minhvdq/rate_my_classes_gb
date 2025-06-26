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
const newUserRouter = require('./controllers/newuser')
const mongoose = require('mongoose')
const path = require('path')
const professorRouter = require('./controllers/professor')

mongoose.set('strictQuery', false)

logger.infor(`connecting to MongoDB`)
logger.infor(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(result => {
    logger.infor(`connected to MongoDB`,config.MONGODB_URI)
}).catch(error => logger.infor(error.message))

const allowedOrigins = [
    'http://localhost:5173',   // Vite dev server
    'http://127.0.0.1:5173',   // Vite dev server alternative
    'http://localhost:3000',   // Production
    'http://127.0.0.1:3000',   // Production alternative
    'https://rate-my-classes-gb.fly.dev' // Production domain
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 204
};

// Apply CORS with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json())
app.use(middlewares.requestLogger)
app.use(middlewares.tokenExtractor)

// API Routes
app.use('/api/user', userRouter)
app.use('/api/review', reviewRouter)
app.use('/api/class', classRouter)
app.use('/api/login', loginRouter)
app.use('/api/newUser', newUserRouter)
app.use('/api/auth', authRouter)
app.use('/api/professor', professorRouter)

// Special routes
app.use('/PasswordReset', (req, res) => {
    res.sendFile(path.join(__dirname, '/ui_assets/index.html'))
})

app.use('/PasswordResetRequest', (req, res) => {
    res.sendFile(path.join(__dirname, '/ui_assets/request.html'))
})

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware should be last
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app