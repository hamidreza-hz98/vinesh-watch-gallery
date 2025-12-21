import * as yup from "yup";

const iranPhoneRegex = /^09\d{9}$/;

export const createCustomerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().matches(iranPhoneRegex).required(),
  email: yup.string().email().nullable(),
  password: yup.string().nullable(),
  birthdate: yup.date().nullable(),
});

export const updateCustomerSchema = yup.object().shape({
  firstName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  phone: yup.string().matches(iranPhoneRegex).nullable(),
  email: yup.string().email().nullable(),
  password: yup.string().nullable(),
  birthdate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
});

export const loginCustomerSchema = yup.object().shape({
  phone: yup.string().matches(iranPhoneRegex).required(),
  password: yup.string().required(),
});
