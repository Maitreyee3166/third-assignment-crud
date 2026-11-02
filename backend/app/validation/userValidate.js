const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 50 characters",
  }),

  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone must be 10 digits",
      "any.required": "Phone is required",
    }),

  image: Joi.string().allow("").optional(),

  department: Joi.string().min(2).max(50).trim().required().messages({
    "string.empty": "Department is required",
    "string.min": "Department must be at least 2 characters",
    "string.max": "Department must be at most 50 characters",
  }),

  role: Joi.string().empty("").valid("student", "admin"),
});

module.exports = { studentSchema };
