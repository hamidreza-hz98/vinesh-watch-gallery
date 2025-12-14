const yup = require("yup");

const createTagSchema = yup.object({
  name: yup.string().trim().min(2).required(),
  slug: yup.string().trim().optional(),
  description: yup.string().trim().optional(),
});

const updateTagSchema = yup.object({
  name: yup.string().trim().min(2).optional(),
  slug: yup.string().trim().optional(),
  description: yup.string().trim().optional(),
});

module.exports = {
  createTagSchema,
  updateTagSchema,
};
