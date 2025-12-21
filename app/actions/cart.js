"use server";

import connectDB from "@/server/db";
import cartService from "@/server/modules/cart/cart.service";
import validate from "@/server/middlewares/validate";
import { authenticate, requireCustomer } from "@/server/middlewares/auth";
import { createCartSchema, updateCartSchema } from "@/validation/cart.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE CART          */
/* -------------------- */
export async function createCart() {
  try {
    await connectDB();

    const body = { products: [], price: {} };
    const data = await validate(createCartSchema, body);

    const cart = await cartService.create(data);

    return { data: serialize(cart) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CUSTOMER CART    */
/* -------------------- */
export async function getCustomerCart(customerId) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const cart = await cartService.getCustomerCart(customerId);

    return { data: serialize( cart) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CART BY ID       */
/* -------------------- */
export async function getCartById(cartId) {
  try {
    await connectDB();

    const cart = await cartService.getCart(cartId);

    return { data: serialize(cart) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE CART          */
/* -------------------- */
export async function updateCart(cartId, body) {
  try {
    await connectDB();

    const data = await validate(updateCartSchema, body);

    const cart = await cartService.update(cartId, data);

    return { data: serialize(cart) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
