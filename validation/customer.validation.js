const yup = require("yup");

const iranPhoneRegex = /^09\d{9}$/;

const customerValidation = {
  create: yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().matches(iranPhoneRegex).required(),
    email: yup.string().email().nullable(),
    password: yup.string().nullable(),
    birthdate: yup.date().nullable(),
  }),

  update: yup.object({
    firstName: yup.string().nullable(),
    lastName: yup.string().nullable(),
    phone: yup.string().matches(iranPhoneRegex).nullable(),
    email: yup.string().email().nullable(),
    password: yup.string().nullable(),
    birthdate: yup.date().nullable(),
  }).test(
    "at-least-one",
    "You must provide at least one field to update",
    value => value && Object.keys(value).length > 0
  ),

  login: yup.object({
    phone: yup.string().matches(iranPhoneRegex).required(),
    password: yup.string().required(),
  }),
};

module.exports = customerValidation;
