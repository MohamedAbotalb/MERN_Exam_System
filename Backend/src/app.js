require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const notFoundPage = require('./middlewares/not-found.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const { isAuthorized } = require('./middlewares/auth.middleware');
const swaggerOptions = require('../swagger.json');
const apiRouter = require('./routes/index');
const authRouter = require('./routes/api/auth.route');

const app = express();
const DB_URL = process.env.MONGODBURL;
const port = process.env.PORT || 5000;
const swaggerSpec = swaggerJSDoc(swaggerOptions);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DB Connected....');
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log('DB Problem ...' + err));

// ****middlewares****

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: '*',
};

app.use(cors(corsOptions));

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

app.get('/', (req, res) =>
  res.status(200).json({ success: true, message: 'Server is running' })
);

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Non auth routes
app.use('/api/v1/auth', authRouter);

//locked routers
app.use(isAuthorized);
app.use('/api/v1', apiRouter);

// Not found page middleWare
app.use(notFoundPage);

// Error middleWare
app.use(errorMiddleware);
