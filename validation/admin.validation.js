const yup = require("yup");

const usernameRegex = /^[a-z0-9._]+$/;

exports.createAdminSchema = yup.object({
  firstName: yup.string().required().trim(),
  lastName: yup.string().required().trim(),

  username: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .min(4)
    .matches(
      usernameRegex,
      "Username can only contain lowercase letters, numbers, dots and underscores"
    ),

  password: yup.string().required().min(6),
});

exports.updateAdminSchema = yup
  .object({
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),

    username: yup
      .string()
      .trim()
      .lowercase()
      .min(4)
      .matches(
        usernameRegex,
        "Username can only contain lowercase letters, numbers, dots and underscores"
      ),

    password: yup.string().min(6),
  })

exports.loginAdminSchema = yup.object({
  username: yup.string().required().trim().lowercase(),
  password: yup.string().required(),
});
