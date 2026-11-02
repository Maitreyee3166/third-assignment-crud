const Student = require("../models/student");
const httpStatusCode = require("../utils/httpStatusCode");
const cloudinary = require("../config/cloudinary");

class Studentcontroller {
  async getAllStudent(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      const skip = (page - 1) * limit;

      const result = await Student.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

      const totalStudents = await Student.countDocuments();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Students fetched successfully",
        data: result,
        pagination: {
          totalStudents,
          currentPage: page,
          totalPages: Math.ceil(totalStudents / limit),
          limit,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async addNewStudent(req, res) {
    try {
      const { name, email, phone, role, department } = req.body;

      // if(phone.length !== 10){
      //     return res.status(400).json({
      //     success: false,
      //     message: `Max should be 10`,
      // });
      // }

      const newStudent = await Student({
        name,
        email,
        phone,
        role: "student",
        department,
      });

      const existingStudent = await Student.findOne({ email });

      if (existingStudent) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Student already exist",
        });
      }

      if (req.file) {
        newStudent.image = req.file.path;
        newStudent.cloudinaryId = req.file.filename;
      }

      const result = await newStudent.save();

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Student created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getStudentById(req, res) {
    try {
      const id = req.params.id;

      const result = await Student.findById(id);

      if (!result) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Student doesn't found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Student gets successfully",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;

      const existingStudent = await Student.findById(id);

      if (!existingStudent) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Student doesn't found",
        });
      }

      const { name, email, phone, department } = req.body;

      if (name) {
        existingStudent.name = name;
      }

      if (email) {
        existingStudent.email = email;
      }

      if (phone) {
        existingStudent.phone = phone;
      }

      if (department) {
        existingStudent.department = department;
      }

      if (req.file) {
        if (existingStudent.cloudinaryId) {
          await cloudinary.uploader.destroy(existingStudent.cloudinaryId);
        }

        existingStudent.image = req.file.path;
        existingStudent.cloudinaryId = req.file.filename;
      }

      const updatedStudent = await existingStudent.save();

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Student updated successfully",
        data: updatedStudent,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;

      const existingStudent = await Student.findById(id);

      if (!existingStudent) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Student cann't find",
        });
      }

      if (existingStudent.cloudinaryId) {
        await cloudinary.uploader.destroy(existingStudent.cloudinaryId);
      }

      await Student.findByIdAndDelete(id);

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new Studentcontroller();
