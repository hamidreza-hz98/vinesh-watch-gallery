"use server";

import connectDB from "@/server/db";
import categoryService from "@/server/modules/category/category.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  create as createCategorySchema,
  update as updateCategorySchema,
} from "@/validation/category.validation";
import QueryString from "qs";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE CATEGORY      */
/* -------------------- */
export async function createCategory(body) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const data = await validate(createCategorySchema, body);
    const category = await categoryService.create(data);

    return {
      message: `دسته بندی ${category.name} با موفقیت ایجاد شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET ALL CATEGORIES   */
/* -------------------- */
export async function getAllCategories(query) {
  try {
    await connectDB();

    const { categories, total } = await categoryService.getAll(query);

    return {
      data: serialize({
        categories,
        total,
        ...query,
      }),
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* GET CATEGORY DETAILS */
/* -------------------- */
export async function getCategoryDetails(filter = {}) {
  try {
    await connectDB();

    const category = await categoryService.getDetails(filter);

    if (!category) {
      return { data: null };
    }

    return {
      data: serialize(category)
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* UPDATE CATEGORY      */
/* -------------------- */
export async function updateCategory(categoryId, body) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const data = await validate(updateCategorySchema, body);
    const category = await categoryService.update(data, categoryId);

    return {
      message: `دسته بندی ${category.name} با موفقیت ویرایش شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}

/* -------------------- */
/* DELETE CATEGORY      */
/* -------------------- */
export async function deleteCategory(categoryId) {
  try {
    await connectDB();

    const auth = await authenticate();
    requireAdmin(auth);

    const category = await categoryService.delete(categoryId);

    return {
      message: `دسته بندی ${category.name} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return { message: error.message, status: error.statusCode || 500 };
  }
}
