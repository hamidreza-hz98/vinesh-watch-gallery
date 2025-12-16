const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const brandService = require("@/server/modules/brand/brand.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { createBrandSchema } = require("@/validation/brand.validation");

exports.runtime = "nodejs";

// CREATE
exports.POST = async function (req) {
  try {
    await connectDB();

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(createBrandSchema, body);

    const brand = await brandService.create(data);

    return NextResponse.json({
      message: `برند ${brand.name} با موفقیت ایجاد شد.`,
      data: brand,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// GET ALL
exports.GET = async function (req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams.entries());

    const { brands, total } = await brandService.getAll(query);

    return NextResponse.json({
      brands,
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
