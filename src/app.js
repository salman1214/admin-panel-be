const express = require('express');

const swaggerUi = require('swagger-ui-express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const swaggerDocs = require('./swaggerConfig');
require('dotenv').config();
require('./db');

const app = express();
const logger = pino();
app.use(pinoHttp({ logger }));

// Middleware
app.use(express.json());
// allow cross-origin requests
const cors = require('cors');
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

module.exports = app;