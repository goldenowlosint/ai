const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Golden Owl AI APIs",
      version: "1.0.0",
      description: "APIs for Golden Owl AI",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./server.js"], // Specify the file that contains the API routes
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Endpoint to receive data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Data received successfully
 *       '400':
 *         description: Bad request
 */
app.post("/api/reviews", (req, res) => {
  const data = req.body;
  // Do something with the data, for example, just log it
  console.log("Received data:", data);
  res.send("Data received successfully");
});

/**
 * @swagger
 * /api/hi:
 *   get:
 *     summary: Endpoint to get data
 *     responses:
 *       '200':
 *         description: Data received successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
app.get("/api/hi", (req, res) => {
  res.send("Data received successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
