import * as Yup from "yup";

export const OfficeValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Office name must be at least 3 characters.")
    .required("Office name is required."),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.")
    .required("Phone number is required."),
});

export const DepartmentValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Department name must be at least 3 characters.")
    .required("Department name is required."),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.")
    .required("Phone number is required."),
  office_id: Yup.string().required("Office selection is required."),
});

export const VisitorValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters.")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits")
    .required("Phone is required"),
  doc_id: Yup.string()
    .min(3, "Fin must be at least 3 characters.")
    .required("Fin is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required"),
});

export const UserValidationSchema = () =>
  Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters.")
      .required("Name is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters.")
      .required("Username is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must contain only digits")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    role_id: Yup.string().required("Role is required"),
    office_id: Yup.string().required("Office is required"),
    department_id: Yup.string().required("Department is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters.")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
    active: Yup.boolean(),
  });
