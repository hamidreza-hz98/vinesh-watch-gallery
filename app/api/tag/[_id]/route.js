const { NextResponse } = require("next/server");
const connectDB  = require("@/server/db");
const tagService = require("@/server/modules/tag/tag.service");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { updateTagSchema } = require("@/validation/tag.validation");

exports.runtime = "nodejs";

exports.GET = async function (req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const filter = Object.fromEntries(searchParams.entries());

    const tag = await tagService.getDetails(filter);

    return NextResponse.json({ data: tag });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    await authenticate(req);
    await requireAdmin(req);

    const body = await req.json();
    const data = await validate(updateTagSchema, body);

    const tag = await tagService.update(data, params._id);

    return NextResponse.json({
      message: `برچسب ${tag.name} با موفقیت ویرایش شد.`,
      data: tag,
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
    await authenticate(req);
    await requireAdmin(req);

    const tag = await tagService.delete(params._id);

    return NextResponse.json({
      message: `برچسب ${tag.name} با موفقیت حذف شد.`,
      data: tag,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};