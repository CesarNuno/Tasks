import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express'

const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My REST API',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
  },
  apis: ['./controllers/*.js'],
}



export const addSwagger = (app) => {
    const specs = swaggerJSDoc(options);
  app.use('/api-docs', serve, setup(specs))
}