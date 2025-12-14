const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const categoryService = require("@/server/modules/category/category.service");

exports.runtime = "nodejs";

exports.GET = async function (req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const filter = Object.fromEntries(url.searchParams.entries());

    const category = await categoryService.getDetails(filter);

    return NextResponse.json({ data: category });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
