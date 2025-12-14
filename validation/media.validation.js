const yup = require("yup");

const uploadSchema = yup.object({
  title: yup.string().optional(),
  alt: yup.string().optional(),
  description: yup.string().optional(),
});

const updateSchema = yup.object({
  title: yup.string().optional(),
  alt: yup.string().optional(),
  description: yup.string().optional(),
});

const getDetailsSchema = yup.object({
  _id: yup.string().required(),
});

module.exports = {
  uploadSchema,
  updateSchema,
  getDetailsSchema,
};
