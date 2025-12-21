"use server";

import connectDB from "@/server/db";
import customerService from "@/server/modules/customer/customer.service";
import {
  authenticate,
  requireAdmin,
  allowCustomerOrAdmin,
} from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createCustomerSchema,
  updateCustomerSchema,
  loginCustomerSchema,
} from "@/validation/customer.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE CUSTOMER (ADMIN) */
/* -------------------- */
export async function createCustomer(body) {
  try {
    await connectDB();

    const auth = await authenticate({ adminOnly: true });
    requireAdmin(auth);

    const data = await validate(createCustomerSchema, body);
    const customer = await customerService.create(data);

    return {
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت ساخته شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* SIGNUP CUSTOMER       */
/* -------------------- */
export async function signupCustomer(body) {
  try {
    await connectDB();

    const data = await validate(createCustomerSchema, body);
    const { customer, token } = await customerService.signup(data);

    return {
      message: `به خانواده ما خوش اومدی!`,
      data: serialize({ customer, token }),
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* LOGIN CUSTOMER        */
/* -------------------- */
export async function loginCustomer(body) {
  try {
    await connectDB();

    const data = await validate(loginCustomerSchema, body);
    const { customer, token } = await customerService.login(data);

    return {
      message: ` ${customer.firstName} عزیز، خوش آمدی!`,
      data: serialize({ customer, token }),
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET ALL CUSTOMERS     */
/* -------------------- */
export async function getAllCustomers(query = {}) {
  try {
    await connectDB();

    const auth = await authenticate({ adminOnly: true });
    requireAdmin(auth);

    const { customers, total } = await customerService.getAll(query);

    return { data: serialize({ customers, total, ...query }) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CUSTOMER DETAILS  */
/* -------------------- */
export async function getCustomerDetails(customerId) {
  try {
    await connectDB();

    const auth = await authenticate();
    allowCustomerOrAdmin(auth, customerId);

    const customer = await customerService.getDetails(customerId);

    return { data: serialize(customer) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE CUSTOMER       */
/* -------------------- */
export async function updateCustomer(customerId, body) {
  try {
    await connectDB();

    const auth = await authenticate();
    allowCustomerOrAdmin(auth, customerId);
    
    const data = await validate(updateCustomerSchema, body);

    // 🔐 password change (optional)
    if (data.oldPassword?.length && data.newPassword?.length) {
      try {
        await customerService.changePassword(
          customerId,
          data.oldPassword,
          data.newPassword
        );
      } catch (error) {
        throw error;
      }
    }

    const customer = await customerService.update(data, customerId);

    return {
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت ویرایش شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* DELETE CUSTOMER       */
/* -------------------- */
export async function deleteCustomer(customerId) {
  try {
    await connectDB();

    const auth = await authenticate({ adminOnly: true });
    requireAdmin(auth);

    const customer = await customerService.delete(customerId);
    return {
      message: `کاربر ${customer.firstName} ${customer.lastName} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
