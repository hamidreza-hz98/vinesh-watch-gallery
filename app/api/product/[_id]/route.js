// /app/api/product/[_id]/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const productService = require("@/server/modules/product/product.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { updateProductSchema } = require("@/validation/product.validation");

exports.runtime = "nodejs";

// UPDATE PRODUCT
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(updateProductSchema, body);

    const product = await productService.update(data, params._id);

    return NextResponse.json({
      message: `محصول ${product.title} با موفقیت به‌روزرسانی شد.`,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { _id } = await params;

    const auth = await authenticate(req);

    requireAdmin(auth);

    const product = await productService.delete(_id);

    return NextResponse.json({
      message: `محصول ${product.title} با موفقیت حذف شد.`,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
