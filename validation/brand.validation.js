const yup = require("yup");
const seoValidationSchema = require("./seo.validation");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

exports.createBrandSchema = yup.object({
  logo: yup.string().matches(objectIdRegex).nullable(),

  tags: yup
    .array()
    .of(yup.string().matches(objectIdRegex))
    .default([]),

  name: yup.string().required().trim(),
  englishName: yup.string().required().trim(),

  slug: yup.string().nullable().trim(),

  description: yup.string().nullable(),

  seo: seoValidationSchema,
});

exports.updateBrandSchema = yup
  .object({
    logo: yup.string().matches(objectIdRegex).nullable(),

    tags: yup.array().of(yup.string().matches(objectIdRegex)),

    name: yup.string().trim(),
    englishName: yup.string().trim(),

    slug: yup.string().trim(),

    description: yup.string().nullable(),

    seo: seoValidationSchema,

    visits: yup.number().min(0),
  })
