import * as Yup from "yup";

export const OfficeValidationSchema = Yup.object({
  name: Yup.string()
    .trim() // Убираем пробелы в начале и конце
    .min(3, "Office name must be at least 3 characters.")
    .required("Office name is required."),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .required("Address is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.") // Проверяем, что только цифры
    .required("Phone number is required."),
});

export const DepartmentValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Department name must be at least 3 characters.")
    .required("Department name is required."),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits.") // Проверяем, что только цифры
    .required("Phone number is required."),
});
