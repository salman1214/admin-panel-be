const swaggerJsDoc = require('swagger-jsdoc');

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation for Admin Panel',
            contact: {
                name: 'Salman',
                email: 'salmannaqvi461@gmail.com'
            },
        },
        servers: [{ url: 'http://localhost:5001' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/swaggerDocs/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;