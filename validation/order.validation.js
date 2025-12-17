// validations/order.validation.js
import * as yup from "yup";
import { createCartSchema } from "./cart.validation";

// Regex to match MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Main order validation schemas
export const createOrderSchema = yup.object({
  status: yup
    .string()
    .oneOf(["pending_payment", "paid", "shipping", "delivered"])
    .default("pending_payment"),
  cart: yup.object().required("Cart is required").noUnknown(false),
  customer: yup
    .string()
    .matches(objectIdRegex, "Invalid customer id")
    .required("Customer is required"),
});

export const updateOrderSchema = yup
  .object()
  .shape({
    status: yup
      .string()
      .oneOf(["pending_payment", "paid", "shipping", "delivered"]),
    shipmentTrackNumber: yup.string().nullable(),
  })
  .test(
    "at-least-one",
    "At least one field must be updated",
    (value) => value && Object.keys(value).length > 0
  );
