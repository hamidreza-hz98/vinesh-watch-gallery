"use server";

import connectDB from "@/server/db";
import orderService from "@/server/modules/order/order.service";
import { authenticate, requireAdmin, requireCustomer } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import { createOrderSchema, updateOrderSchema } from "@/validation/order.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE ORDER          */
/* -------------------- */
export async function createOrder(data) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const validatedData = await validate(createOrderSchema, data);

    const order = await orderService.create(validatedData);

    return { message: "سفارش با موفقیت ایجاد شد.", data: serialize(order) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET ALL ORDERS (ADMIN) */
/* -------------------- */
export async function getAllOrders(query = {}) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const { orders, total } = await orderService.getAll(query);

    return { data: serialize({ orders, total, ...query }) };
  } catch (error) {
    console.log(error);
    
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET ORDER DETAILS (ADMIN) */
/* -------------------- */
export async function getOrderDetails(_id) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const order = await orderService.getDetails(_id);

    return { data: serialize(order) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE ORDER (ADMIN) */
/* -------------------- */
export async function updateOrder(_id, data) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const validatedData = await validate(updateOrderSchema, data);

    const order = await orderService.update(validatedData, _id);

    return { message: `سفارش ${order.code} با موفقیت ویرایش شد.` };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CUSTOMER ORDERS  */
/* -------------------- */
export async function getCustomerOrders(customerId, query = {}) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const { orders, total } = await orderService.getCustomerOrders(customerId, query);
    

    return { data: serialize({ orders, total, ...query }) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CUSTOMER ORDER DETAILS */
/* -------------------- */
export async function getCustomerOrderDetails(code, query = {}) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const order = await orderService.getCustomerOrderDetails(code, query);

    return { data: serialize(order) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
