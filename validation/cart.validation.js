const yup = require("yup");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Single product schema
const cartProductSchema = yup.object({
  product: yup.string().matches(objectIdRegex).required(),
  quantity: yup.number().min(1).default(1),
});

// Price schema
const priceSchema = yup
  .object({
    products: yup.number().min(0).default(0),
    shipment: yup.number().min(0).default(0),
    discounts: yup.number().min(0).default(0),
  })
  .default({});

// ✅ Simplified create cart schema
exports.createCartSchema = yup.object({
  products: yup.array().of(cartProductSchema).min(0).required(),
  price: priceSchema,
});

// Update cart schema can stay flexible
exports.updateCartSchema = yup.object({
  products: yup.array().of(cartProductSchema),
  price: priceSchema,
});
