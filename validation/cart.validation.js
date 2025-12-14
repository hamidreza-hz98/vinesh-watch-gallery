const yup = require("yup");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const cartProductSchema = yup.object({
  product: yup.string().matches(objectIdRegex).required(),
  quantity: yup.number().min(1).default(1),
});

const priceSchema = yup.object({
  products: yup.number().min(0).default(0),
  shipment: yup.number().min(0).default(0),
  discounts: yup.number().min(0).default(0),
}).default({});

exports.createCartSchema = yup.object({
  products: yup.array().of(cartProductSchema).min(1).required(),
  customer: yup.string().matches(objectIdRegex).required(),
  description: yup.string().nullable(),
  address: yup.string().matches(objectIdRegex).nullable(),
  payment: yup.object().default({}),
  price: priceSchema,
});

exports.updateCartSchema = yup
  .object({
    products: yup.array().of(cartProductSchema),
    customer: yup.string().matches(objectIdRegex),
    description: yup.string().nullable(),
    address: yup.string().matches(objectIdRegex).nullable(),
    payment: yup.object(),
    price: priceSchema,
  })
