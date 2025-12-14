const yup = require("yup");
const mongoose = require("mongoose");

// ObjectId validator
const objectIdValidator = yup
  .string()
  .test("is-objectid", "Invalid ObjectId", (value) => {
    if (!value) return true; // allow null/empty
    return mongoose.Types.ObjectId.isValid(value);
  })
  .nullable();

// SEO schema
const seoValidationSchema = yup.object().shape({
  title: yup.string().max(255).nullable(),
  description: yup.string().nullable(),
  keywords: yup.string().nullable(),
  ogTitle: yup.string().max(255).nullable(),
  ogDescription: yup.string().nullable(),
  ogImage: objectIdValidator,
  twitterTitle: yup.string().max(255).nullable(),
  twitterDescription: yup.string().nullable(),
  twitterImage: objectIdValidator,
  canonical: yup.string().url().nullable(),
  robots: yup.string().nullable(),
  additionalMetaTags: yup.string().nullable(),
});

module.exports = seoValidationSchema;
