// validations/product.validation.js
const yup = require("yup");
const seoValidationSchema = require("./seo.validation");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const specificationSchema = yup.object({
  key: yup.string().required(),
  value: yup.string().required(),
});

exports.createProductSchema = yup.object({
  title: yup.string().required(),
  slug: yup.string().nullable(),
  excerpt: yup.string().required(),

  price: yup.number().min(0).default(0),
  discount: yup.number().min(0).default(0),
  description: yup.string().nullable(),

  media: yup
    .array()
    .of(yup.string().matches(objectIdRegex))
    .default([]),

  stock: yup.number().min(0).default(0),

  relatedProducts: yup
    .array()
    .of(yup.string().matches(objectIdRegex))
    .default([]),

  visits: yup.number().min(0).default(0),

  tags: yup
    .array()
    .of(yup.string().matches(objectIdRegex))
    .default([]),

  categories: yup
    .array()
    .of(yup.string().matches(objectIdRegex))
    .min(1)
    .required(),

  brand: yup.string().matches(objectIdRegex).nullable(),

  soldNumber: yup.number().min(0).default(0),

  shortSpecifications: yup
    .array()
    .of(specificationSchema)
    .default([]),

  specifications: yup
    .array()
    .of(specificationSchema)
    .default([]),

  seo: seoValidationSchema,
});

/* ---------------------------------- */
/* UPDATE PRODUCT */
/* ---------------------------------- */

exports.updateProductSchema = yup.object({
  title: yup.string(),
  slug: yup.string(),
  excerpt: yup.string(),

  price: yup.number().min(0),
  discount: yup.number().min(0),
  description: yup.string().nullable(),

  media: yup.array().of(yup.string().matches(objectIdRegex)),

  stock: yup.number().min(0),

  relatedProducts: yup.array().of(
    yup.string().matches(objectIdRegex)
  ),

  visits: yup.number().min(0),

  tags: yup.array().of(yup.string().matches(objectIdRegex)),

  categories: yup.array().of(
    yup.string().matches(objectIdRegex)
  ),

  brand: yup.string().matches(objectIdRegex).nullable(),

  soldNumber: yup.number().min(0),

  shortSpecifications: yup.array().of(specificationSchema),

  specifications: yup.array().of(specificationSchema),

  seo: seoValidationSchema,
});

