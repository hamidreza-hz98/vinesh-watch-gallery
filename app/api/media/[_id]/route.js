const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { updateSchema } = require("@/validation/media.validation");
const { mediaService } = require("@/server/modules/media/media.service");

exports.runtime = "nodejs";

exports.PUT = async function (req, { params }) {
  try {
    await connectDB();
    const auth = await authenticate(req);
    requireAdmin(auth);

    const formData = await req.formData();
    const file = formData.get("file");

    const body = Object.fromEntries(formData.entries());
    delete body.file;

    const data = await validate(updateSchema, body);

    const media = await mediaService.update(params._id, {
      file,
      body: data,
    });

    return NextResponse.json({
      message: "مدیا با موفقیت به روز رسانی شد.",
      data: media,
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

    const media = await mediaService.delete(params._id);

    return NextResponse.json({
      message: `مدیا ${media.originalName} با موفقیت حذف شد.`,
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
    const { searchParams } = new URL(req.url);
    const filter = Object.fromEntries(searchParams.entries());

    const media = await mediaService.getDetails(filter);

    return NextResponse.json({ data: media });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
