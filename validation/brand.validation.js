const yup = require("yup");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const seoSchema = yup.object({
  title: yup.string().nullable(),
  description: yup.string().nullable(),
  keywords: yup.array().of(yup.string()),
  ogImage: yup.string().matches(objectIdRegex).nullable(),
  twitterImage: yup.string().matches(objectIdRegex).nullable(),
});

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

  seo: seoSchema,
});

exports.updateBrandSchema = yup
  .object({
    logo: yup.string().matches(objectIdRegex).nullable(),

    tags: yup.array().of(yup.string().matches(objectIdRegex)),

    name: yup.string().trim(),
    englishName: yup.string().trim(),

    slug: yup.string().trim(),

    description: yup.string().nullable(),

    seo: seoSchema,

    visits: yup.number().min(0),
  })
