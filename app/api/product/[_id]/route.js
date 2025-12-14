// /app/api/product/[_id]/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const productService = require("@/server/modules/product/product.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { productValidation } = require("@/server/modules/product/product.validation");

exports.runtime = "nodejs";

// UPDATE PRODUCT
exports.PUT = async (req, { params }) => {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(productValidation.update, body);

    const product = await productService.update(data, params._id);

    return NextResponse.json({
      message: `محصول ${product.title} با موفقیت به‌روزرسانی شد.`,
      data: product,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};

// DELETE PRODUCT
exports.DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const product = await productService.delete(params._id);

    return NextResponse.json({
      message: `محصول ${product.title} با موفقیت حذف شد.`,
      data: product,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode || 500 });
  }
};
