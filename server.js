import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import NewsAPI from "./routes/news.routes.js";
import ReviewsAPI from "./routes/reviews.routes.js";
import TrafficAPI from "./routes/traffic.routes.js";
import SocialAPI from "./routes/social.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

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
        url: "https://applications-ai.w5n4tq.easypanel.host/",
      },
    ],
  },
  apis: ["./server.js"],
};
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
app.use("/api/reviews", ReviewsAPI);


app.use("/api/news", NewsAPI);


app.use("/api/traffic", TrafficAPI);


app.use("/api/social", SocialAPI);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
