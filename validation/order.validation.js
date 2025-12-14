// validations/order.validation.js
const yup = require("yup");

// Regex to match MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Schema for individual order product
const orderProductSchema = yup.object({
  product: yup
    .string()
    .matches(objectIdRegex, "Invalid ObjectId")
    .required("Product is required"),
  quantity: yup.number().min(1).default(1).required(),
});

// Schema for price breakdown (optional, default values)
const priceSchema = yup.object({
  products: yup.number().min(0).default(0),
  shipment: yup.number().min(0).default(0),
  discounts: yup.number().min(0).default(0),
}).default({});

// Main order validation schemas
const orderValidation = {
  create: yup.object({
    status: yup
      .string()
      .oneOf(["pending_payment", "paid", "shipping", "delivered"])
      .default("pending_payment"),
    cart: yup.object().required("Cart is required"),
    customer: yup
      .string()
      .matches(objectIdRegex, "Invalid customer id")
      .required("Customer is required"),
    description: yup.string().nullable().default(""),
    transaction: yup.string().matches(objectIdRegex).nullable(),
    shipmentDate: yup.date().nullable(),
    shipmentTrackNumber: yup.string().nullable().default(""),
  }),

  update: yup
    .object({
      status: yup.string().oneOf(["pending_payment", "paid", "shipping", "delivered"]),
      shipmentTrackNumber: yup.string().nullable(),
    })
    .test(
      "at-least-one",
      "At least one field must be updated",
      (value) => value && Object.keys(value).length > 0
    ),
};

module.exports = {
  orderProductSchema,
  priceSchema,
  orderValidation,
};
