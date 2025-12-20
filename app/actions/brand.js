"use server";

import connectDB from "@/server/db";
import brandService from "@/server/modules/brand/brand.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createBrandSchema,
  updateBrandSchema,
} from "@/validation/brand.validation";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE BRAND         */
/* -------------------- */
export async function createBrand(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(createBrandSchema, body);

    const brand = await brandService.create(data);

    return {
      message: `برند ${brand.name} با موفقیت ایجاد شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET ALL BRANDS       */
/* -------------------- */
export async function getAllBrands(query = {}) {
  try {
    await connectDB();

    const { brands, total } = await brandService.getAll(query);


    return {
      data: serialize({ brands, total, ...query }),
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET BRAND DETAILS    */
/* -------------------- */
export async function getBrandDetails(filter = {}) {
  try {
    await connectDB();

    const brand = await brandService.getDetails(filter);

    return { data: serialize(brand) };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE BRAND         */
/* -------------------- */
export async function updateBrand(brandId, body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(updateBrandSchema, body);

    const brand = await brandService.update(data, brandId);

    return {
      message: `برند ${brand.name} با موفقیت به‌روزرسانی شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* DELETE BRAND         */
/* -------------------- */
export async function deleteBrand(brandId) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const brand = await brandService.delete(brandId);

    return {
      message: `برند ${brand.name} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
