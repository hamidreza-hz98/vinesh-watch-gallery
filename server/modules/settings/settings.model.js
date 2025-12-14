const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamps = require("mongoose-timestamp");
const SeoSchema = require("./SEO");

const ContactInfoSchema = new Schema(
  {
    mobile: { type: String },
    phone: { type: String },
    email: { type: String, default: "" },
    address: { type: String },
    mapIframe: { type: String },
  },
  { _id: false }
);

const SocialSchema = new Schema(
  {
    instagram: { type: String, default: "" },
    telegram: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    x: { type: String, default: "" },
  },
  { _id: false }
);

const FAQSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const TermsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const AboutSchema = new Schema(
  {
    image: { type: Schema.Types.ObjectId, ref: "Media" },
    description: { type: String },
  },
  { _id: false }
);

const SettingsSchema = new Schema({
  [`default-seo`]: SeoSchema,

  general: {
    logo: { type: Schema.Types.ObjectId, ref: "Media" },
    name: { type: String },
    footerText: { type: String },
    contactInfo: ContactInfoSchema,
    social: SocialSchema,
    homepageSlider: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  },

  faq: [FAQSchema],

  terms: [TermsSchema],

  about: AboutSchema,
});

SettingsSchema.plugin(timestamps);

module.exports = mongoose.models.Settings ||mongoose.model("Settings", SettingsSchema);
