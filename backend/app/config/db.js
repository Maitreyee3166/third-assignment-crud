require("dotenv").config();
const mongoose = require("mongoose");

const DbCon = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL ||
        "mongodb+srv://maitreyeesamanta66_db_user:ghu2uF0uEnpYFvzd@cluster0.5x3cizk.mongodb.net/student_app",
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DbCon;
