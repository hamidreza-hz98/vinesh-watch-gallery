// /app/api/product/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const productService = require("@/server/modules/product/product.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createProductSchema } = require("@/validation/product.validation");

exports.runtime = "nodejs";

// CREATE PRODUCT
exports.POST = async (req) => {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(createProductSchema, body);

    const product = await productService.create(data);

    return NextResponse.json({
      message: `محصول ${product.title} با موفقیت ایجاد شد.`,
      data: product,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET ALL PRODUCTS
exports.GET = async (req) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());

    const { products, total } = await productService.getAll(query);

    return NextResponse.json({ data: { products, total, ...query } });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET PRODUCT SEO
exports.GET_SEO = async (req) => {
  try {
    await connectDB();
    const url = new URL(req.url);
    const filter = Object.fromEntries(url.searchParams.entries());

    const seo = await productService.getSeoData(filter);

    return NextResponse.json({ data: seo });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// GET PRODUCTS FOR SITEMAP
exports.GET_SITEMAP = async () => {
  try {
    await connectDB();
    const products = await productService.getProductsForSitemap();

    return NextResponse.json({ data: products });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
