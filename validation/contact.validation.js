const yup = require("yup");

const iranMobileRegex = /^09\d{9}$/;

const contactValidation = {
  submit: yup.object({
    fullName: yup.string().min(3).max(80).required(),
    mobile: yup.string().trim().matches(iranMobileRegex).required(),
    message: yup.string().min(5).max(2000).required(),
  }),
};

module.exports = contactValidation;
