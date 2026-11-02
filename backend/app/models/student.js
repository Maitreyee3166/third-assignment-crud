const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    
    department: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    cloudinaryId: {
      type: String,
      default: "",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const studentModel = mongoose.model("student", StudentSchema);
module.exports = studentModel;
