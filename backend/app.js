const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middlewares = require('./utils/middlewares');
const classRouter = require('./controllers/class');
const userRouter = require('./controllers/user');
const reviewRouter = require('./controllers/review');
const loginRouter = require('./controllers/login');
const authRouter = require('./controllers/auth.router');
const newUserRouter = require('./controllers/newuser');
const professorRouter = require('./controllers/professor');
const mongoose = require('mongoose');
const path = require('path');

mongoose.set('strictQuery', false);

logger.infor('connecting to MongoDB');
logger.infor(config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.infor('connected to MongoDB', config.MONGODB_URI);
  })
  .catch((error) => logger.infor(error.message));

// Accept full Origin (with scheme) and both domains
const allowedOriginPatterns = [
  /^https?:\/\/localhost:\d+$/,
  /^https?:\/\/127\.0\.0\.1:\d+$/,
  /^https?:\/\/rate-my-classes-gb\.fly\.dev$/,
  /^https?:\/\/ratemyclassesgb\.study$/,
  /^https?:\/\/www\.ratemyclassesgb\.study$/,
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // same-origin / curl
    const ok = allowedOriginPatterns.some((rx) => rx.test(origin));
    return ok ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(middlewares.requestLogger);
app.use(middlewares.tokenExtractor);

// API Routes
app.use('/api/user', userRouter);
app.use('/api/review', reviewRouter);
app.use('/api/class', classRouter);
app.use('/api/login', loginRouter);
app.use('/api/newUser', newUserRouter);
app.use('/api/auth', authRouter);
app.use('/api/professor', professorRouter);

// Special routes (serve specific HTML)
app.get('/PasswordReset', (req, res) => {
  res.sendFile(path.join(__dirname, '/ui_assets/index.html'));
});

app.get('/PasswordResetRequest', (req, res) => {
  res.sendFile(path.join(__dirname, '/ui_assets/request.html'));
});

// ---- Static assets BEFORE SPA fallback ----

// Serve versioned assets with long cache; Express sets proper MIME automatically
app.use(
  '/assets',
  express.static(path.join(__dirname, 'dist', 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// Serve other static files (index.html, images, etc.)
app.use(express.static(path.join(__dirname, 'dist')));

// Unknown API endpoints (404) — must be before SPA fallback
// (If your unknownEndpoint expects only /api, you can do: app.use('/api', middlewares.unknownEndpoint))
app.use('/api', middlewares.unknownEndpoint);

// ---- SPA fallback LAST (exclude /assets and /api) ----
app.get(/^(?!\/(assets|api)\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handler last
app.use(middlewares.errorHandler);

module.exports = app;
