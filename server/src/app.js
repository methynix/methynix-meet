const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');
const adminRoutes = require('./routes/adminRoutes');

const {
  securityHeaders,
  limiter,
  loginLimiter,
  apiLimiter,
  preventParameterPollution,
} = require('./middlewares/securityMiddleware');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.set('trust proxy', 1);

app.use(securityHeaders);

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(preventParameterPollution);

app.use('/api', limiter);

app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register', limiter);
app.use('/api/events', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

module.exports = app;