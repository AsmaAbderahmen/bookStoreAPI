
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
            {
                name: 'users',
                description: 'this tag is for the users services'
            },
            {
                name: 'auth',
                description: 'this tag is for the authentication and api security services'
            },
            {
                name: 'authors',
                description: 'this tag is for the book authors services'
            },
            {
                name: 'books',
                description: 'this tag is for the books services'
            },
        ],
        definitions: {
            users: {
                type: "object",
                properties:
                {
                    id: {
                        type: "string",
                    },
                    username: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    }
                }
            },
            auth: {
                type: "object",
                properties:
                {
                    _id: {
                        type: "string",
                    },
                    token: {
                        type: "string",
                    },
                    refresh_token: {
                        type: "string",
                    },

                }
            },
            authors: {
                type: "object",
                properties:
                {
                    _id:
                    {
                        type: "string"
                    },
                    fullname:
                    {
                        type: "string"
                    },
                    biography:
                    {
                        type: "string"
                    },
                    image:
                    {
                        type: "string"
                    },

                }
            },
            books: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",

                    },
                    price: {
                        type: "number",
                    },
                    author: {
                        $ref: "#/definitions/authors",
                    },
                    pages: {
                        type: "string",
                    },
                    image: {
                        type: "string",
                    },
                }
            }
        }
    },
    apis: ["index.js", "./routes/*.js", "./documentations/*.js"]
};

exports.swaggerDocs = swaggerOptions;