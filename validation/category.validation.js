const yup = require("yup");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const seoValidationSchema = require("../../constants/seo-validation-schema");

const categoryValidation = {
  create: yup.object({
    name: yup.string().required().trim(),
    slug: yup.string().nullable().trim(),
    description: yup.string().required().trim(),

    image: yup.string().matches(objectIdRegex).nullable(),
    children: yup.array().of(yup.string().matches(objectIdRegex)).default([]),
    tags: yup.array().of(yup.string().matches(objectIdRegex)).default([]),

    seo: seoValidationSchema,
  }),

  update: yup
    .object({
      name: yup.string().trim(),
      slug: yup.string().trim(),
      description: yup.string().trim(),

      image: yup.string().matches(objectIdRegex).nullable(),
      children: yup.array().of(yup.string().matches(objectIdRegex)),
      tags: yup.array().of(yup.string().matches(objectIdRegex)),

      seo: seoValidationSchema,
      visits: yup.number().min(0),
    })
};

module.exports = categoryValidation;
