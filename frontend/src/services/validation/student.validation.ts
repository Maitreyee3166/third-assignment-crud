import * as yup from "yup";

export const studentSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is Required!!"),
  email: yup
    .string()
    .email("Invalid Email Format")
    .required("Email is Required!!"),

  phone: yup
  .string()
  .required("Phone number is required")
  .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  
  department: yup.string().required("Department is required"),

  image: yup.mixed<File>(),
});

export type StudentPayloadType = yup.InferType<typeof studentSchema>;
