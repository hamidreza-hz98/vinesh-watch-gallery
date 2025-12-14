// validations/settings.validation.js
const yup = require("yup");
const seoValidationSchema = require("../../constants/seo-validation-schema");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const iranMobileRegex = /^09\d{9}$/;
const iranPhoneRegex = /^0\d{10}$/;

const ContactInfoSchema = yup.object({
  mobile: yup.string().trim().matches(iranMobileRegex, "Mobile number must be a valid Iranian mobile (e.g. 09123456789)").default(""),
  phone: yup.string().trim().matches(iranPhoneRegex, "Phone must be a valid Iranian phone number (e.g. 02112345678)").default(""),
  email: yup.string().trim().email().nullable(),
  address: yup.string().trim(),
  mapIframe: yup.string().trim(),
});

const SocialSchema = yup.object({
  instagram: yup.string().trim().url().nullable(),
  telegram: yup.string().trim().url().nullable(),
  whatsapp: yup.string().trim().url().nullable(),
  facebook: yup.string().trim().url().nullable(),
  youtube: yup.string().trim().url().nullable(),
  linkedin: yup.string().trim().url().nullable(),
  x: yup.string().trim().url().nullable(),
});

const FAQSchema = yup.object({
  question: yup.string().trim().required(),
  answer: yup.string().trim().required(),
});

const TermsSchema = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const AboutSchema = yup.object({
  image: yup.string().matches(objectIdRegex),
  description: yup.string().trim(),
});

const settingsValidation = {
  create: yup.object({
    "default-seo": seoValidationSchema,
    general: yup.object({
      name: yup.string(),
      logo: yup.string().matches(objectIdRegex),
      footerText: yup.string().trim(),
      contactInfo: ContactInfoSchema,
      social: SocialSchema,
      homepageSlider: yup.array().of(yup.string().matches(objectIdRegex)).default([]),
    }),
    faq: yup.array().of(FAQSchema).default([]),
    terms: yup.array().of(TermsSchema).default([]),
    about: AboutSchema,
  }),

  update: yup.object({
    "default-seo": seoValidationSchema,
    general: yup.object({
      name: yup.string(),
      logo: yup.string().matches(objectIdRegex),
      footerText: yup.string().trim(),
      contactInfo: ContactInfoSchema,
      social: SocialSchema,
      homepageSlider: yup.array().of(yup.string().matches(objectIdRegex)),
    }),
    faq: yup.array().of(FAQSchema),
    terms: yup.array().of(TermsSchema),
    about: AboutSchema,
  }).test(
    "at-least-one",
    "At least one field must be updated",
    (value) => value && Object.keys(value).length > 0
  ),
};

module.exports = settingsValidation;
