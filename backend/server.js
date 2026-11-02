require("dotenv").config();

const app = require("./app/utils/app.js");

const connectDB = require("./app/config/db.js");

const PORT = process.env.PORT || 6899;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("Server Started Successfully");
    console.log(`API: http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
};

startServer();


