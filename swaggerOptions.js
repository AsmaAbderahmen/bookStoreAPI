
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'bookStore API',
            description: 'BookStore Api documentation',
            contact: { asma: 'abderahmen.asma@gmail.com' },
            servers: ["http://localhost:3000"]
        },
        securityDefinitions: {
            Bearer: {
                type: "apiKey",
                name: "authorization",
                in: "header"
            }
        },
        tags: [
      
        ],
        definitions: {
          
        }
    },
    apis: ["index.js", "./routes/*.js", "./documentations/*.js"]
};

exports.swaggerDocs = swaggerOptions;