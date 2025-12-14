const yup = require("yup");

const iranMobileRegex = /^09\d{9}$/;
const iranZipCodeRegex = /^\d{10}$/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

exports.createAddressSchema = yup.object({
  name: yup.string().required().trim(),
  recipientName: yup.string().trim().nullable(),
  recipientPhone: yup
    .string()
    .trim()
    .nullable()
    .matches(
      iranMobileRegex,
      "Recipient phone must be a valid Iranian mobile number (e.g. 09123456789)"
    ),
  address: yup.string().required().trim(),
  zipCode: yup
    .string()
    .required()
    .trim()
    .matches(iranZipCodeRegex, "Zip code must be a valid 10-digit Iranian postal code"),
  customer: yup.string().matches(objectIdRegex).required(),
  province: yup.string().required().trim(),
  city: yup.string().required().trim(),
});

exports.updateAddressSchema = yup
  .object({
    name: yup.string().trim(),
    recipientName: yup.string().trim().nullable(),
    recipientPhone: yup
      .string()
      .trim()
      .nullable()
      .matches(
        iranMobileRegex,
        "Recipient phone must be a valid Iranian mobile number (e.g. 09123456789)"
      ),
    address: yup.string().trim(),
    zipCode: yup.string().trim().matches(
      iranZipCodeRegex,
      "Zip code must be a valid 10-digit Iranian postal code"
    ),
    customer: yup.string().matches(objectIdRegex).nullable(),
    province: yup.string().trim(),
    city: yup.string().trim(),
  })
