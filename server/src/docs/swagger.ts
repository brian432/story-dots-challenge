import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.3",
  info: {
    title: "Documentación de story-dots API challenge",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
    {
      url: "https://story-dots-server.onrender.com/"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "Bearer"
      }
    },
    schemas: {
      register: {
        type: "object",
        required: ["username", "password", "isAdmin"],
        properties: {
          username: {
            type: "string"
          },
          password: {
            type: "string"
          },
          isAdmin: {
            type: "boolean"
          }
        }
      },
      login: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string"
          },
          password: {
            type: "string"
          }
        }
      },
      postProduct: {
        type: "object",
        required: ["name", "description", "image_url", "price", "marca"],
        properties: {
          name: {
            type: "string"
          },
          description: {
            type: "string"
          },
          image_url: {
            type: "string"
          },
          price: {
            type: "number"
          },
          marca: {
            type: "string"
          }
        }
      },
      updateProduct: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          description: {
            type: "string"
          },
          image_url: {
            type: "string"
          },
          price: {
            type: "number"
          },
          marca: {
            type: "string"
          }
        }
      },
    }
  }
}
const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"]
}

export default swaggerJSDoc(swaggerOptions)