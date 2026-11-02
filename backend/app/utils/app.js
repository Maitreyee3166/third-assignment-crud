// require("dotenv").config();

console.log("app.js LOADED");

const express = require("express");
const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const SwaggerOptions = require("../../swagger.json");

// const routes = require("../routes");

const routes = require("../routes")

const swaggerDocument = swaggerJsDoc({
  definition: SwaggerOptions,
  // apis: ["app.js", "./app/routes/*.js"],
  apis: ["./app/routes/*.js"],
});


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:6899",
      "https://third-assignment-frontend.vercel.app",
      "https://third-assignment-frontend-git-main-maitreyee-samanta.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.originalUrl);
  next();
});


app.get("/", (req, res) => {
   console.log("ROOT ROUTE HIT");

  res.status(200).json({
    success: true,
    message: "Role Based Authentication System API is running",
  });
});


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);
app.use("/api", routes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  console.log(`Unhandled server error: ${error.message}`);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = app;
