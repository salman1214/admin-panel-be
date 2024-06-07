const express = require('express');

const swaggerUi = require('swagger-ui-express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const swaggerDocs = require('./swaggerConfig');
require('dotenv').config();
require('./db');

const app = express();
const logger = pino();
// app.use(pinoHttp({ logger }));

// Middleware
app.use(express.json());


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', require('./routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;