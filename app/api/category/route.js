const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const categoryService = require("@/server/modules/category/category.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const {
  create: createCategorySchema,
} = require("@/validation/category.validation");
const QueryString = require("qs");

exports.runtime = "nodejs";

exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(createCategorySchema, body);

    const category = await categoryService.create(data);

    return NextResponse.json({
      message: `دسته بندی ${category.name} با موفقیت ایجاد شد.`,
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

exports.GET = async function (req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const objectedQuery = Object.fromEntries(url.searchParams.entries());
    const query = QueryString.parse(objectedQuery);


    const { categories, total } = await categoryService.getAll(query);

    return NextResponse.json({
      categories,
      total,
      ...query,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
