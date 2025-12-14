const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const categoryService = require("@/server/modules/category/category.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { update: updateCategorySchema } = require("@/validation/category.validation");

exports.runtime = "nodejs";

exports.PUT = async function (req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(updateCategorySchema, body);

    const category = await categoryService.update(data, params._id);

    return NextResponse.json({
      message: `دسته بندی ${category.name} با موفقیت ویرایش شد.`,
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

exports.DELETE = async function (req, { params }) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const category = await categoryService.delete(params._id);

    return NextResponse.json({
      message: `دسته بندی ${category.name} با موفقیت حذف شد.`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
