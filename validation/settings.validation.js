// validations/settings.validation.js
import * as yup from "yup";

const seoValidationSchema = require("./seo.validation");

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const iranMobileRegex = /^09\d{9}$/;
const iranPhoneRegex = /^0\d{10}$/;

const ContactInfoSchema = yup.object({
  mobile: yup
    .string()
    .trim()
    .matches(iranMobileRegex, {
      message: "Mobile number must be a valid Iranian mobile",
      excludeEmptyString: true,
    })
    .notRequired(),

  phone: yup
    .string()
    .trim()
    .matches(iranPhoneRegex, {
      message: "Phone must be a valid Iranian phone number",
      excludeEmptyString: true,
    })
    .notRequired(),

  email: yup.string().trim().email().nullable().notRequired(),
  address: yup.string().trim().notRequired(),
  mapIframe: yup.string().trim().notRequired(),
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

export const createSettingsSchema = yup.object().shape({
  "default-seo": seoValidationSchema,
  general: yup
  .object({
    name: yup.string().notRequired(),
    logo: yup
      .string()
      .matches(objectIdRegex, { excludeEmptyString: true })
      .notRequired(),
    footerText: yup.string().trim().notRequired(),
    contactInfo: ContactInfoSchema.notRequired(),
    social: SocialSchema.notRequired(),
    homepageSlider: yup.array().of(
      yup.string().matches(objectIdRegex)
    ).notRequired(),
  })
  .notRequired(),
  faq: yup.array().of(FAQSchema).default([]),
  terms: yup.array().of(TermsSchema).default([]),
  about: AboutSchema,
});

export const updateSettingsSchema = yup
  .object()
  .shape({
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
  })
  .test(
    "at-least-one",
    "At least one field must be updated",
    (value) => value && Object.keys(value).length > 0
  );
