const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const upload = require("@/server/lib/upload");
const { authenticate, requireAdmin } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");
const { uploadSchema } = require("@/validation/media.validation");
const { mediaService } = require("@/server/modules/media/media.service");

exports.runtime = "nodejs";

exports.POST = async function (req) {
  try {
    await connectDB();
    const auth = await authenticate(req);
    requireAdmin(auth);

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      throw Object.assign(new Error("فایل الزامی است."), { statusCode: 400 });
    }

    const body = Object.fromEntries(formData.entries());
    delete body.file;

    const data = await validate(uploadSchema, body);

    const media = await mediaService.upload({
      file,
      body: data,
    });

    return NextResponse.json({
      message: "مدیا با موفقیت بارگزاری شد.",
      data: media,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};
