"use server";

import connectDB from "@/server/db";
import productService from "@/server/modules/product/product.service";
import { authenticate, requireAdmin } from "@/server/middlewares/auth";
import validate from "@/server/middlewares/validate";
import {
  createProductSchema,
  updateProductSchema,
} from "@/validation/product.validation";
import QueryString from "qs";
import { serialize } from "@/lib/request";

/* -------------------- */
/* CREATE PRODUCT       */
/* -------------------- */
export async function createProduct(body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(createProductSchema, body);
    const product = await productService.create(data);

    return {
      message: `محصول ${product.title} با موفقیت ایجاد شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET ALL PRODUCTS     */
/* -------------------- */
export async function getAllProducts(query = {}) {
  try {
    await connectDB();

    const parsedQuery = QueryString.parse(query);
    const { products, total } = await productService.getAll(parsedQuery);

    return {
      data: serialize({
        products,
        total,
        ...parsedQuery,
      }),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* GET PRODUCT DETAILS  */
/* -------------------- */
export async function getProductDetails(filter = {}) {
  try {
    await connectDB();

    const product = await productService.getDetails(filter);

    return {
      data: serialize(product),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* UPDATE PRODUCT       */
/* -------------------- */
export async function updateProduct(productId, body) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const data = await validate(updateProductSchema, body);
    const product = await productService.update(data, productId);

    return {
      message: `محصول ${product.title} با موفقیت به‌روزرسانی شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* DELETE PRODUCT       */
/* -------------------- */
export async function deleteProduct(productId) {
  try {
    await connectDB();

    const auth = await authenticate({adminOnly: true});
    requireAdmin(auth);

    const product = await productService.delete(productId);

    return {
      message: `محصول ${product.title} با موفقیت حذف شد.`,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* PRODUCT SEO DATA     */
/* -------------------- */
export async function getProductSeo(filter = {}) {
  try {
    await connectDB();

    const seo = await productService.getSeoData(filter);

    return {
      data: serialize(seo),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}

/* -------------------- */
/* PRODUCTS FOR SITEMAP */
/* -------------------- */
export async function getProductsForSitemap() {
  try {
    await connectDB();

    const products = await productService.getProductsForSitemap();

    return {
      data: serialize(products),
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.statusCode || 500,
    };
  }
}
