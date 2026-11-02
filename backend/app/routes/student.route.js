const express = require('express');
const studentController = require('../controller/student.controller');

const studentImage = require("../utils/cloudinary");

const { studentSchema } = require("../validation/userValidate");
const validate = require("../middleware/joiValidate");

const router = express.Router();


/**
 * @swagger
 * /api/student/:
 *   get:
 *     summary: Get all Students with Pagination
 *     tags:
 *       - Student
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of students per page
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/", studentController.getAllStudent);


/**
 * @swagger
 * /api/student/create:
 *   post:
 *     summary: Create Student
 *     tags:
 *       - Student
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - department
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/create",
  studentImage.single("image"),
  validate(studentSchema),
  studentController.addNewStudent
);

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Get student by id
 *     tags:
 *       - Student
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student fetched successfully
 *       400:
 *         description: Invalid Student ID
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", studentController.getStudentById);

/**
 * @swagger
 * /api/student/update/{id}:
 *   put:
 *     summary: Update Student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string 
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               department:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */

router.put("/update/:id", studentImage.single("image"),
  validate(studentSchema), studentController.updateStudent);

/**
 * @swagger
 * /api/student/delete/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:id", studentController.deleteStudent);


module.exports = router;