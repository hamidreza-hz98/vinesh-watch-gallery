"use server";

import connectDB from "@/server/db";
import addressService from "@/server/modules/address/address.service";
import { authenticate, requireCustomer } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createAddressSchema,
  updateAddressSchema,
} from "@/validation/address.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE ADDRESS       */
/* -------------------- */
export async function createAddress(body) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const data = await validate(createAddressSchema, body);

    const address = await addressService.create(data);

    return {
      message: "آدرس جدید با موفقیت ساخته شد.",
      data: address,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CUSTOMER ADDRESSES */
/* -------------------- */
export async function getCustomerAddresses(customerId) {
  
  
  try {
    await connectDB();
    
    console.log(await authenticate());
    const auth = await authenticate();
    requireCustomer(auth);

    

    const addresses = await addressService.getCustomerAddresses(customerId);

    return { data: serialize(addresses) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE ADDRESS       */
/* -------------------- */
export async function updateAddress(addressId, body) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const data = await validate(updateAddressSchema, body);

    const address = await addressService.update(data, addressId);

    return {
      message: "آدرس با موفقیت ویرایش شد.",
      data: address,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* DELETE ADDRESS       */
/* -------------------- */
export async function deleteAddress(addressId) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireCustomer(auth);

    const address = await addressService.delete(addressId);

    return {
      message: "آدرس با موفقیت حذف شد.",
      data: address,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
