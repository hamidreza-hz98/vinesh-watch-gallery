// /app/api/settings/[section]/route.js
const { NextResponse } = require("next/server");
const connectDB = require("@/server/db");
const settingsService = require("@/server/modules/settings/settings.service");
const { updateSettingsSchema } = require("@/validation/settings.validation");
const { requireAdmin, authenticate } = require("@/server/middlewares/auth");
const validate = require("@/server/middlewares/validate");

exports.runtime = "nodejs";

// GET SETTINGS SECTION
exports.GET = async (req, { params }) => {
  try {
    await connectDB();

    const { section } = await params;

    const settings = await settingsService.getSection(section);

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// UPDATE SETTINGS SECTION
exports.PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { section } = await params;

    const auth = await authenticate(req);
    requireAdmin(auth);

    const body = await req.json();
    const data = await validate(updateSettingsSchema, body);

    const settings = await settingsService.update(data, section);

    return NextResponse.json({
      message: "تنظیمات سایت با موفقیت ویرایش شد.",
      data: settings,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode || 500 }
    );
  }
};